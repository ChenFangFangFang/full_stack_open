import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { addBlog, updateFormField } from "../reducers/blogListReducer";
import TextField from "@mui/material/TextField";

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
    <Box
      sx={{
        display: "flex",
        padding: 2,
        backgroundColor: "#f9f9f9" // Li
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 500,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            Add a new blog
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="title"
              label="Title"
              variant="outlined"
              margin="normal"
              value={title}
              defaultValue="Small"
              onChange={handleInputChange("title")}
            />

            <TextField
              fullWidth
              id="author"
              label="Author"
              variant="outlined"
              margin="normal"
              value={author}
              defaultValue="Small"
              onChange={handleInputChange("author")}
            />

            <TextField
              fullWidth
              id="url"
              label="Url"
              variant="outlined"
              margin="normal"
              value={url}
              defaultValue="Small"
              onChange={handleInputChange("url")}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              value="Login"
              margin="normal"
              sx={{ marginTop: 2 }}
            >
              Create
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddBlog;
