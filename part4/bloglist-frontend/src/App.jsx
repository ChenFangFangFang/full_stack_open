import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]) // changed to an array to hold multiple blogs
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage("Wrong credentials")
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const addedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(addedBlog)) // Update the blogs list with the new blog
      setNewBlog({ title: "", author: "", url: "" }) // Clear the form fields
    } catch (exception) {
      setErrorMessage("Failed to add blog")
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input
          value={newBlog.title}
          onChange={event => setNewBlog({ ...newBlog, title: event.target.value })}
        />
      </div>
      <div>
        Author:
        <input
          value={newBlog.author}
          onChange={event => setNewBlog({ ...newBlog, author: event.target.value })}
        />
      </div>
      <div>
        Url:
        <input
          value={newBlog.url}
          onChange={event => setNewBlog({ ...newBlog, url: event.target.value })}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  )

  return (
    <div>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>Logout</button>
          <h2>Add a new blog</h2>
          {blogForm()}
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