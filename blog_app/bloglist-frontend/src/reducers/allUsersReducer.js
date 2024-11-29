import { createSlice } from "@reduxjs/toolkit";
import users from "../services/users"; // Assume you have a service to fetch all users

const usersSlice = createSlice({
  name: "users",
  initialState: [], // Initial state is an empty array of users
  reducers: {
    setUsers(state, action) {
      return action.payload; // Store all users
    }
  }
});

export const { setUsers } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const fetchedUsers = await users.getAll(); // Assume this function fetches the list of all users
      dispatch(setUsers(fetchedUsers)); // Dispatch action to set all users
    } catch (error) {
      console.error("Failed to initialize users:", error);
    }
  };
};

export default usersSlice.reducer;
