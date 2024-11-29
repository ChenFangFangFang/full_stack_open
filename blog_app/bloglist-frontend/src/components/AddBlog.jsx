import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBlog, updateFormField } from "../reducers/blogListReducer";
const AddBlog = ({ onBlogCreated }) => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.blogs.form);
  console.log("Form from Redux:", form); // This should log the form state

  const { title, author, url } = form || {};

  const handleInputChange = (field) => (event) => {
    dispatch(updateFormField({ field, value: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addBlog());
    if (onBlogCreated) onBlogCreated();
  };

  return (
    <div className="addBlog">
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            data-testid="title"
            value={title}
            onChange={handleInputChange("title")}
          />
        </div>
        <div>
          Author:
          <input
            data-testid="author"
            value={author}
            onChange={handleInputChange("author")}
          />
        </div>
        <div>
          Url:
          <input
            data-testid="url"
            value={url}
            onChange={handleInputChange("url")}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddBlog;
