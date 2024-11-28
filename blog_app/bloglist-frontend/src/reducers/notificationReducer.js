import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload; // Set the notification message
    },
    clearNotification() {
      return ""; // Clear the notification message
    }
  }
});

export const { setNotification, clearNotification } = notificationSlice.actions;

// Thunk action for setting a notification with a timeout
export const showNotification = (message, timeout) => {
  return (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout);
  };
};

export default notificationSlice.reducer;
