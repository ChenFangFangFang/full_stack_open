import { createSlice } from "@reduxjs/toolkit";
import blogs from "../services/blogs";
import { showNotification } from "./notificationReducer";
const blogSlice = createSlice({
  name: "blogs", //slice name
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updated = action.payload;
      return state.map((blog) => (blog.id === updated.id ? updated : blog));
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlog(state, action) {
      return action.payload;
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
    }
  }
});
export const { createBlog, updateBlog, appendBlog, setBlog, removeBlog } =
  blogSlice.actions;
export const initializeBlogs = () => {
  return async (dispatch) => {
    const fetchedBlogs = await blogs.getAll();
    dispatch(setBlog(fetchedBlogs));
  };
};
export const addBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogs.create(content);

      dispatch(createBlog(newBlog));
      dispatch(
        showNotification(
          { message: `You added: "${content}"`, type: "success" },
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
