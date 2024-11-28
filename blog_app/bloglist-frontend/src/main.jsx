import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogListReducer from "./reducers/blogListReducer";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogListReducer //blogs 和app 中的对应
  }
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
