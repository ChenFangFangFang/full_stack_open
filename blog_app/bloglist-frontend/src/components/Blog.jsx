import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import userStorage from "../services/userStorage";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogListReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  //sconst blogs = useSelector((state) => state.blogs); // Fetch notification from Redux store

  useEffect(() => {
    const storedVisibility = localStorage.getItem(`blog-${blog.id}-visible`);
    if (!storedVisibility) {
      setVisible(JSON.parse(storedVisibility));
    }
  }, [blog.id]);
  const toggleVisibility = () => {
    const newVisible = !visible;
    setVisible(newVisible);
    // Save visibility state to localStorage
    localStorage.setItem(`blog-${blog.id}-visible`, JSON.stringify(newVisible));
  };
  // const nameOfUser = blog.user ? blog.user.name : 'anonymous'
  const nameOfUser = blog.user && blog.user.name ? blog.user.name : "anonymous";

  const handleLike = () => {
    dispatch(likeBlog(blog)); // Dispatch likeBlog action to Redux
  };
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this blog?`)) {
      dispatch(deleteBlog(blog)); // Dispatch deleteBlog action to Redux
    }
  };
  const allowDelete = blog.user
    ? blog.user.username === userStorage.me()
    : true;
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };
  return (
    <div style={style} className="blog">
      {blog.title} Author: {blog.author}
      <button onClick={toggleVisibility}>{visible ? "Hide" : "View"}</button>
      {visible && (
        <div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>User: {nameOfUser}</div>
          <div>
            Likes: {blog.likes}
            <button style={{ marginLeft: 3 }} onClick={() => handleLike(blog)}>
              Like
            </button>
          </div>
          {allowDelete && (
            <button onClick={() => handleDelete(blog)}>Delete</button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired
  }).isRequired
};

export default Blog;
