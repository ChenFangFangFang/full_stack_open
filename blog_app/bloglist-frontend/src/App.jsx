import { useState, useEffect, createRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogListReducer";
import AddBlog from "./components/AddBlog";
import Login from "./components/Login";
import Togglable from "./components/Togglable";
import userStorage from "./services/userStorage";

const App = () => {
  const dispatch = useDispatch();

  //const [blogs, setBlogs] = useState([]);
  const blogs = useSelector((state) => state.blogs.blogs || []);
  useEffect(() => {
    console.log("Dispatching initializeBlogs...");
    dispatch(initializeBlogs());
  }, [dispatch]);
  console.log("Blog", blogs);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = userStorage.loadUser();
    if (user) {
      setUser(user);
    }
  }, []);
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
      setUser(user);
      userStorage.saveUser(user);
      notify(`Welcome back, ${user.name}`);
    } catch (error) {
      notify("Wrong credentials", "error");
    }
  };

  const handleLogout = () => {
    setUser(null);
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
          <AddBlog />
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
