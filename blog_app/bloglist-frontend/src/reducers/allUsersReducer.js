import { createSlice } from "@reduxjs/toolkit";
import users from "../services/users"; // Assume you have a service to fetch all users

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userBlogs: {}
  }, // Initial state is an empty array of users
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setUserBlogs(state, action) {
      const { userId, blogs } = action.payload;
      state.userBlogs[userId] = blogs; // Store all users
    },
    addUser(state, action) {
      const user = action.payload;
      const existingUser = state.users.find((u) => u.id === user.id);
      if (!existingUser) {
        state.users.push(user);
      }
    }
  }
});

export const { setUsers, setUserBlogs, addUser } = usersSlice.actions;

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
export const fetchUserById = (id) => async (dispatch) => {
  try {
    const user = await users.getById(id); // Assume this fetches a user by ID
    if (user) dispatch(addUser(user));
  } catch (error) {
    console.error(`Failed to fetch user with ID ${id}:`, error);
  }
};
export const userBlogsList = (userId) => {
  return async (dispatch) => {
    try {
      const fetchedBlogs = await users.getBlog(userId); // Assume this function fetches the list of all users
      dispatch(setUserBlogs({ userId, blogs: fetchedBlogs }));
    } catch (error) {
      console.error(`Failed to fetch blogs for user ${userId}:`, error);
    }
  };
};

export default usersSlice.reducer;
