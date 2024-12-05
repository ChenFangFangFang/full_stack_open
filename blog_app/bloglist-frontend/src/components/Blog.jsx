import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "../reducers/blogListReducer";
import { useParams } from "react-router-dom";
import { fetchBlogById } from "../reducers/blogListReducer";
import Togglable from "./Togglable";
import { addComment, setContent } from "../reducers/commentReducer";

const CommentInput = () => {
  const dispatch = useDispatch();
  const contentFromRedux = useSelector((state) => state.comment.content);
  const [content, setLocalContent] = useState(contentFromRedux);
  console.log("Form from Redux:", content); // This should log the form state
  useEffect(() => {
    setLocalContent(contentFromRedux); // Sync local state with Redux state
  }, [contentFromRedux]);
  const handleChange = (event) => {
    dispatch(setContent(event.target.value)); // Update Redux state with input value
  };
  const { id } = useParams();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting comment:", content); // Log content to confirm

    dispatch(addComment(id));
    dispatch(setContent(""));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="comment"
        type="text"
        placeholder="Write a comment"
        value={content}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
const Blog = () => {
  const { id } = useParams();
  console.log("Blog ID from URL:", id);

  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogs.blog[id]);

  console.log("Blog from Redux:", blog);

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
        {""} by {blog.author}
      </h1>

      <div>
        <div>
          URL: <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          Likes: {blog.likes}
          <button style={{ marginLeft: 3 }} onClick={handleLike}>
            Like
          </button>
        </div>
        <div>Added by {blog.user.name}</div>
      </div>
      <h3>Comments</h3>
      <Togglable buttonLabel="Add a comment">
        <CommentInput />
      </Togglable>
      {(blog.comments || []).map((comment) => (
        <ul key={comment.id}>
          <li>{comment.content}</li>
        </ul>
      ))}
    </div>
  );
};
export default Blog;
