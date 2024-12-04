import { createSlice } from "@reduxjs/toolkit";
import comments from "../services/comments";
import { showNotification } from "./notificationReducer";
import { updateBlogComments } from "./blogListReducer";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    content: "",
    comments: []
  },
  reducers: {
    setContent(state, action) {
      state.content = action.payload;
    },
    setComment(state, action) {
      state.comments.push(action.payload);
    }
  }
});
export const { setContent, setComment } = commentSlice.actions;

export const addComment = (blogId) => {
  return async (dispatch, getState) => {
    const content = getState().comment.content; // Get the current content from Redux state
    console.log("Adding comment:", { blogId, content }); // Log the payload

    if (!content) {
      console.log("Content is empty.");
      return;
    }
    try {
      const newComment = await comments.create(blogId, { content });
      dispatch(setComment(newComment));
      dispatch(updateBlogComments({ blogId, newComment }));
      dispatch(setContent(""));
      dispatch(
        showNotification(
          { message: `You added: "${newComment.content}"`, type: "success" },
          5000
        )
      );
    } catch (error) {
      dispatch(
        showNotification(
          { message: "Failed to add comment", type: "error" },
          5000
        )
      );
    }
  };
};
export default commentSlice.reducer;
