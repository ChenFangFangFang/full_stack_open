import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "../reducers/blogListReducer";
import { useParams } from "react-router-dom";
import { fetchBlogById } from "../reducers/blogListReducer";
import Togglable from "./Togglable";
import { addComment } from "../reducers/commentReducer";

const CommentInput = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    onSubmit(comment);
    event.target.comment.value = "";
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="comment" type="text" placeholder="Write a comment" />
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
  const handleCommentSubmit = (comment) => {
    dispatch(addComment({ content: comment, blogId: id })); // Dispatch the addComment action
  };

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
      <h3>Comments</h3>
      <Togglable buttonLabel="Add a comment">
        <CommentInput onSubmit={handleCommentSubmit} />
      </Togglable>
      {blog.comments.map((comment) => (
        <ul key={comment.id}>
          <li>{comment.content}</li>
        </ul>
      ))}
    </div>
  );
};
export default Blog;
