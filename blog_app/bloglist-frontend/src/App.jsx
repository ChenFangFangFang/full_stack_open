import { useState, useEffect, createRef, useId } from "react";
import Blogs from "./components/Blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogListReducer";
import { userBlogsList } from "./reducers/allUsersReducer";
import { blogInfo } from "./reducers/blogListReducer";
import Login from "./components/Login";
import userStorage from "./services/userStorage";
import { setUser, clearUser } from "./reducers/userReducer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Users from "./components/Users";
import Layout from "./components/Layout";
import UserBlogs from "./components/UserBlogs";

const App = () => {
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogs.blog || []);
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
    if (blog && blog.id) {
      console.log(`Fetching blogs for user ID: ${blog.id}`);
      dispatch(blogInfo(blog.id));
    }
  }, [dispatch, blog]);
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
        <Notification />
        <Login login={handleLogin} />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <Layout user={user} handleLogout={handleLogout}>
              <Notification />
              <Blogs />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout user={user} handleLogout={handleLogout}>
              <Notification />
              <Blogs />
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
        <Route
          path="/blogs/:id"
          element={
            <Layout user={user} handleLogout={handleLogout}>
              <Notification />
              <Blog />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
