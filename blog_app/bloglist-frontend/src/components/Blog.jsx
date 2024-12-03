import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "../reducers/blogListReducer";
import { useParams } from "react-router-dom";
import { fetchBlogById } from "../reducers/blogListReducer";
const Blog = () => {
  const { id } = useParams();
  console.log("Blog ID from URL:", id);

  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogs.blog[id]);

  console.log("Blog from Redux:", blog);
  //const nameOfUser = blog.user && blog.user.name ? blog.user.name : "anonymous";

  const handleLike = () => {
    dispatch(likeBlog(blog)); // Dispatch likeBlog action to Redux
  };
  useEffect(() => {
    if (!blog) {
      dispatch(fetchBlogById(id));
    }
  }, [blog, id, dispatch]);
  if (!blog) {
    return null;
  }

  return (
    <div>
      <h1>
        {blog.title}
        {""} {blog.author}
      </h1>

      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          Likes: {blog.likes}
          <button style={{ marginLeft: 3 }} onClick={handleLike}>
            Like
          </button>
        </div>
        <div>Added by {blog.user.name}</div>
      </div>
    </div>
  );
};
export default Blog;
