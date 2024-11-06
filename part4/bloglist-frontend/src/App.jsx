import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blog, setBlogs] = useState({ title: "", author: "", url: "", likes: "" })
  const [newBlog, setNewBlog] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername(username)
      setPassword(password)
    } catch (exception) {
      setErrorMessage("Wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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

  const blogForm = () => {
    <form onSubmit={addBlog}>
      <input
        value={newBlog}
        onChange={handleBlogChange} />
      <button type="submit">Save</button>
    </form>
  }
  return (
    <div>


      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>

          <h2>blogs</h2>
          {blog.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }



    </div>
  )
}

export default App