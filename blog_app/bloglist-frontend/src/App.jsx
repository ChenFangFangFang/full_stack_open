import { useState, useEffect, createRef, useId } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogListReducer";
import { userBlogsList } from "./reducers/allUsersReducer";
import AddBlog from "./components/AddBlog";
import Login from "./components/Login";
import Togglable from "./components/Togglable";
import userStorage from "./services/userStorage";
import { setUser, clearUser } from "./reducers/userReducer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Users from "./components/Users";
import Layout from "./components/Layout";
import UserBlogs from "./components/UserBlogs";
const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs || []);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log("Dispatching initializeBlogs...");
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (user && user.id) {
      console.log(`Fetching blogs for user ID: ${user.id}`);
      dispatch(userBlogsList(user.id));
    }
  }, [dispatch, user]);
  useEffect(() => {
    const storedUser = userStorage.loadUser();
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
  }, [dispatch]); //remain login
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
  const padding = {
    padding: 5
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout user={user} handleLogout={handleLogout}>
              <h2>Blogs</h2>
              <Notification />
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
            </Layout>
          }
        />
        <Route
          path="/users"
          element={
            <Layout user={user} handleLogout={handleLogout}>
              <Users />
            </Layout>
          }
        />
        <Route
          path="/users/:id"
          element={
            <Layout user={user} handleLogout={handleLogout}>
              <UserBlogs user={user} />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
