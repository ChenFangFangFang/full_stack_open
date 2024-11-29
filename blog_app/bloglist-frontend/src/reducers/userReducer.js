import { createSlice } from "@reduxjs/toolkit";
import userStorage from "../services/userStorage";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
      //This action is used to store the logged-in user in the Redux state.
    },
    clearUser(state) {
      return null;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
