import { createSlice } from "@reduxjs/toolkit";
import comments from "../services/comments";
import { showNotification } from "./notificationReducer";
const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: []
  },
  reducers: {
    setComment(state, action) {
      state.comments.push(action.payload);
    }
  }
});
export const { setComment } = commentSlice.actions;

export const addComment = (content) => {
  return async (dispatch) => {
    try {
      const newComment = await comments.create(content);

      dispatch(setComment(newComment));
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
