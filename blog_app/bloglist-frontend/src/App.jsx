import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import AddBlog from './components/AddBlog'
import Login from './components/Login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    const fetchInitialData = async () => {
      // Check for logged in user
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }

      // Fetch blogs
      try {
        const initialBlogs = await blogService.getAll()
        setBlogs(initialBlogs)
      } catch (error) {
        setNotificationMessage('Failed to fetch blogs')
        setNotificationType('error')
        setTimeout(() => setNotificationMessage(null), 5000)
      }
    }

    fetchInitialData()
  }, [])

  const handleLogout = () => {
    setUser(null)
    setUsername('')
    setPassword('')
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null) // Clear the token
  }

  const handleAddLike = async (blog) => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user?.id // Use optional chaining
      }
      const response = await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map(b => (b.id !== blog.id ? b : response)))
    } catch (error) {
      setNotificationMessage('Failed to update likes')
      setNotificationType('error')
      setTimeout(() => setNotificationMessage(null), 5000)
    }
  }

  const handleDelete = async (blog) => {
    if (!window.confirm(`Do you really want to delete "${blog.title}"?`)) {
      return
    }

    try {
      const deleted = await blogService.deleteBlog(blog.id)
      if (deleted) {
        // Update the local state to remove the deleted blog
        setBlogs(prevBlogs => prevBlogs.filter(b => b.id !== blog.id))
        setNotificationMessage(`Successfully deleted blog: ${blog.title}`)
        setNotificationType('success')
      } else {
        throw new Error('Failed to delete blog')
      }
    } catch (error) {
      console.error('Delete error:', error)
      setNotificationMessage(
        `Failed to delete blog: ${error.response?.data?.error || error.message}`
      )
      setNotificationType('error')
    } finally {
      // Clear notification after 5 seconds
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType(null)
      }, 5000)
    }
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
          <Togglable openLabel="Add a new blog" closeLabel="Cancel">
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
            .slice()
            .sort((a, b) => b.likes - a.likes)
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