import { useState, useEffect, createRef } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogListReducer";
import AddBlog from "./components/AddBlog";
import Login from "./components/Login";
import Togglable from "./components/Togglable";
import userStorage from "./services/userStorage";
import { setUser, clearUser } from "./reducers/userReducer";
const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs || []);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log("Dispatching initializeBlogs...");
    dispatch(initializeBlogs());
  }, [dispatch]);
  console.log("Blog", blogs);

  // useEffect(() => {
  //   const loggedUser = window.localStorage.getItem("loggedUser");
  //   if (loggedUser) {
  //     try {
  //       const parsedUser = JSON.parse(loggedUser);
  //       console.log(window.localStorage.getItem("loggedUser"));

  //       dispatch(setUser(parsedUser)); // Restore the user
  //     } catch (error) {
  //       console.error("Failed to parse logged user from localStorage:", error);
  //     }
  //   }
  // }, [dispatch]);
  const notify = (message, type = "success") => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
  };
  const blogFormRef = createRef();
  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      dispatch(setUser(user));
      userStorage.saveUser(user);
      notify(`Welcome back, ${user.name}`);
    } catch (error) {
      notify("Wrong credentials", "error");
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    userStorage.removeUser();
    notify(`Bye, ${user.name}!`);
  };

  if (!user) {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification />
        <Login login={handleLogin} />
      </div>
    );
  }
  const byLikes = (a, b) => b.likes - a.likes;
  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <AddBlog
            onBlogCreated={() => blogFormRef.current.toggleVisibility()}
          />
        </Togglable>
        {blogs
          .slice()
          .sort(byLikes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default App;
