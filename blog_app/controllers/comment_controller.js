const commentRouter = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");

commentRouter.post("/", async (request, response) => {
  try {
    const { content, blog: blogId } = request.body;
    // Validate input
    if (!content || !blogId) {
      return response
        .status(400)
        .json({ error: "Content and blog ID are required" });
    }
    // Find the blog
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }
    // Create and save the new comment
    const comment = new Comment({ content, blogs: blogId });
    const savedComment = await comment.save();
    // Add the comment ID to the blog's comments array
    blog.comments = blog.comments.concat(savedComment._id);
    await blog.save();
    // Return the full saved comment in the response
    response.status(201).json(savedComment);
  } catch (error) {
    response
      .status(400)
      .json({ error: "Error saving comment", details: error.message });
  }
});

commentRouter.put("/:id", async (request, response) => {
  try {
    const { content, blogId } = request.body;
    const comment = {
      content,
      blog: blogId
    };
    const updatedComment = await Comment.findByIdAndUpdate(
      request.params.id,
      comment,
      {
        new: true
      }
    );
    if (!updatedComment) {
      return response.status(404).json({ error: "Comment not found" });
    }
    response.status(201).json(updatedComment);
  } catch (error) {
    response
      .status(400)
      .json({ error: "Error saving comment", details: error.message });
  }
});

module.exports = commentRouter;
