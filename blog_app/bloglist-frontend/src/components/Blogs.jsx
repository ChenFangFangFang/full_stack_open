import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect, createRef, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "../reducers/blogListReducer";
import Togglable from "./Togglable";
import AddBlog from "./AddBlog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs || []);
  const blogFormRef = createRef();

  useEffect(() => {
    console.log("Dispatching initializeBlogs...");
    dispatch(initializeBlogs());
  }, [dispatch]);

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <AddBlog onBlogCreated={() => blogFormRef.current.toggleVisibility()} />
      </Togglable>
      <div style={{ marginTop: "20px" }}>
        <List>
          {blogs
            .slice()
            .sort(byLikes)
            .map((blog) => (
              <React.Fragment key={blog.id}>
                <ListItem
                  disablePadding
                  primary={blog.title}
                  component={Link}
                  to={`/blogs/${blog.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemButton>
                    <ListItemText primary={blog.title} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
        </List>
      </div>
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
