import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import AddBlog from './components/AddBlog'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([]) // changed to an array to hold multiple blogs
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
      setBlogs(initialBlogs))
  }, [])


  const handleLogout = () => {
    setUser(null)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <Notification message={notificationMessage} type={notificationType} />

      {user === null ?
        <Login
          username={username}
          password={password}
          setUser={setUser}
          setUsername={setUsername}
          setPassword={setPassword}
          setNotificationMessage={setNotificationMessage}
          setNotificationType={setNotificationType}
        /> :
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>Logout</button>
          <AddBlog
            blogs={blogs}
            setBlogs={setBlogs}
            newBlog={newBlog}
            setNewBlog={setNewBlog}
            setNotificationMessage={setNotificationMessage}
            setNotificationType={setNotificationType}
          />
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App