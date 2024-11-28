import { useState, useEffect, createRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import AddBlog from "./components/AddBlog";
import Login from "./components/Login";
import Togglable from "./components/Togglable";
import userStorage from "./services/userStorage";

const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
  const handleAddBlog = async (blog) => {
    const newBlog = await blogService.create(blog);
    setBlogs(blogs.concat(newBlog));
    notify(`Blog created: ${newBlog.title}, ${newBlog.author}`);
    blogFormRef.current.toggleVisibility();
  };
  const handleLogout = () => {
    setUser(null);
    userStorage.removeUser();
    notify(`Bye, ${user.name}!`);
  };

  const handleAddLike = async (blog) => {
    console.log("updating", blog);

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    };
    const response = await blogService.update(blog.id, updatedBlog);

    notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`);
    setBlogs(
      blogs.map((b) =>
        b.id === blog.id ? { ...response, user: blog.user } : b
      )
    );
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Do you really want to delete "${blog.title}"?`)) {
      console.log(blog.id);
      await blogService.deleteBlog(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
      notify(`Blog ${blog.title}, by ${blog.author} removed`);
    }
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
          <AddBlog newBlog={handleAddBlog} />
        </Togglable>
        {blogs.sort(byLikes).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleAddLike={handleAddLike}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
