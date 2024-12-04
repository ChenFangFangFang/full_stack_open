import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Blogs = ({ blog }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };
  return (
    <div style={style} className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  );
};

Blogs.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired
  }).isRequired
};

export default Blogs;
