import React, { useState } from "react";
const AddBlog = ({ newBlog }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    newBlog({ title, url, author });
    setAuthor("");
    setTitle("");
    setUrl("");
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
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author:
          <input
            data-testid="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url:
          <input data-testid="url" value={url} onChange={handleUrlChange} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddBlog;
