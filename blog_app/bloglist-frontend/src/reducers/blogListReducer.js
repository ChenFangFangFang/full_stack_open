import { createSlice } from "@reduxjs/toolkit";
import blogs from "../services/blogs";
import { showNotification } from "./notificationReducer";
const initialState = {
  blogs: [], // Ensure this is an empty array
  form: { title: "", author: "", url: "" }, // Default form state
  blog: {}
};

const blogSlice = createSlice({
  name: "blogs", //slice name
  initialState,
  reducers: {
    createBlog(state, action) {
      state.blogs.push(action.payload);
    },
    updateBlog(state, action) {
      const updated = action.payload;
      state.blogs = state.blogs.map((blog) =>
        blog.id === updated.id ? updated : blog
      );
      state.blog[updated.id] = updated; // with this, the added like is visible
    },
    appendBlog(state, action) {
      state.blogs.push(action.payload);
    },
    setBlog(state, action) {
      state.blogs = action.payload;
    },
    updateBlogComments(state, action) {
      const { blogId, newComment } = action.payload;
      if (state.blog[blogId]) {
        state.blog[blogId].comments.push(newComment);
      }
    },
    removeBlog(state, action) {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload.id);
    },
    updateFormField(state, action) {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    resetForm(state) {
      state.form = { title: "", author: "", url: "" };
    },
    setSingleBlog(state, action) {
      const { blogId, blog } = action.payload;
      state.blog[blogId] = blog;
    }
  }
});
export const {
  createBlog,
  updateBlog,
  appendBlog,
  setBlog,
  updateBlogComments,
  removeBlog,
  updateFormField,
  resetForm,
  setSingleBlog
} = blogSlice.actions;
export const initializeBlogs = () => {
  return async (dispatch) => {
    console.log("Initializing blogs..."); // Logs when the action starts

    try {
      const fetchedBlogs = await blogs.getAll();
      console.log("Fetched blogs:", fetchedBlogs); // Logs the fetched blogs

      if (fetchedBlogs && Array.isArray(fetchedBlogs)) {
        dispatch(setBlog(fetchedBlogs)); // Updates the Redux state
      } else {
        console.error("Fetched blogs are not in expected format");
      }
    } catch (error) {
      console.error("Failed to initialize blogs:", error);
    }
  };
};
export const fetchBlogById = (id) => async (dispatch) => {
  try {
    const blog = await blogs.getBlogById(id); // Assume this fetches a user by ID
    if (blog) dispatch(setSingleBlog({ blogId: id, blog }));
  } catch (error) {
    console.error(`Failed to fetch blog with ID ${id}:`, error);
  }
};
export const blogInfo = (blogId) => {
  return async (dispatch) => {
    try {
      const fetchedBlogs = await blogs.getBlogById(blogId); // Assume this function fetches the list of all users
      dispatch(setSingleBlog({ blogId, fetchedBlogs }));
    } catch (error) {
      console.error(`Failed to fetch blogs for user ${blogId}:`, error);
    }
  };
};

export const addBlog = () => {
  return async (dispatch, getState) => {
    try {
      const { form } = getState().blogs;
      const newBlog = await blogs.create(form);

      dispatch(createBlog(newBlog));
      dispatch(resetForm());
      dispatch(
        showNotification(
          { message: `You added: "${newBlog.title}"`, type: "success" },
          5000
        )
      );
    } catch (error) {
      dispatch(
        showNotification({ message: "Failed to add blog", type: "error" }, 5000)
      );
    }
  };
};
export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogs.deleteBlog(blog.id);
      dispatch(removeBlog(blog));
      dispatch(
        showNotification(
          { message: `You deleted: "${blog.title}"`, type: "success" },
          5000
        )
      );
    } catch (error) {
      dispatch(
        showNotification(
          { message: "Failed to delete blog", type: "error" },
          5000
        )
      );
    }
  };
};
export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogs.update(blog.id, {
        ...blog,
        likes: blog.likes + 1
      });
      const blogWithUser = { ...updatedBlog, user: blog.user }; //with this, the delete button show as expectation
      dispatch(updateBlog(blogWithUser));
      dispatch(
        showNotification(
          { message: `You voted for: "${blog.title}"`, type: "success" },
          5000
        )
      );
      console.log(`Notification dispatched for blog: ${blog.title}`);
    } catch (error) {
      dispatch(
        showNotification(
          { message: "Failed to like blog", type: "error" },
          5000
        )
      );
    }
  };
};
export default blogSlice.reducer;
