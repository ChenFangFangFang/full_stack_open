import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogListReducer from "./reducers/blogListReducer";
import { Provider } from "react-redux";
import userReducer from "./reducers/userReducer";
import allUsersReducer from "./reducers/allUsersReducer";
import commentReducer from "./reducers/commentReducer";
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogListReducer, //blogs 和app 中的对应,
    user: userReducer,
    users: allUsersReducer,
    comment: commentReducer
  }
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
