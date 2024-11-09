import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import AddBlog from './components/AddBlog'
import Login from './components/Login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([]) // changed to an array to hold multiple blogs
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

    // 初次挂载时加载博客列表
    blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs))
  }, []) // 空依赖数组，确保仅在初次挂载时执行


  const handleLogout = () => {
    setUser(null)
    setUsername('')
    setPassword('')
    window.localStorage.removeItem('loggedBlogappUser') // Clear user data from local storage
  }
  const handleDelete = async (blog) => {
    if (window.confirm(`Do you really want to delete "${blog.title}"?`)) {
      try {
        await blogService.deleteBlog(blog.id) // 发送删除请求

        // 重新获取博客列表，以确保状态同步
        setBlogs(blogs.filter(b => b.id !== blog.id))

        setNotificationMessage(`Deleted blog: ${blog.title}`)
        setNotificationType('success')
        setTimeout(() => setNotificationMessage(null), 5000)
      } catch (error) {
        console.error('Failed to delete blog:', error.response?.data || error)
        setNotificationMessage('Failed to delete blog')
        setNotificationType('error')
        setTimeout(() => setNotificationMessage(null), 5000)
      }
    }
  }

  const handleAddLike = async (blog) => {
    const blogId = blog.id
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : undefined, // Ensure user ID is sent, not the entire user object
    }
    const response = await blogService.update(blogId, updatedBlog)
    console.log('Updated Blog:', response)
    setBlogs(blogs.map((b) => (b.id !== blog.id ? b : response)))
  }

  return (
    <div>
      <Notification message={notificationMessage} type={notificationType} />

      {user === null ? (
        <Login
          username={username}
          password={password}
          setUser={setUser}
          setUsername={setUsername}
          setPassword={setPassword}
          setNotificationMessage={setNotificationMessage}
          setNotificationType={setNotificationType}
        />
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>Logout</button>
          <Togglable openLabel="Add a new blog" closeLabel="Cancle">
            {(toggleVisibility) => (
              <AddBlog
                blogs={blogs}
                setBlogs={setBlogs}
                newBlog={newBlog}
                setNewBlog={setNewBlog}
                setNotificationMessage={setNotificationMessage}
                setNotificationType={setNotificationType}
                toggleVisibility={toggleVisibility}
              />
            )}
          </Togglable>
          <h2>Blogs</h2>

          {blogs
            .slice() // Make a copy of blogs to avoid mutation
            .sort((a, b) => b.likes - a.likes) // Sort by likes, descending
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleAddLike={handleAddLike}
                handleDelete={() => handleDelete(blog)}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
