
import {  useState } from 'react'

const Login = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = (event) => {
    event.preventDefault()
    login({ username,password })
    setUsername('')
    setPassword('')
  }
  return (

    <form onSubmit={handleLogin}>
      <label>
          username
        <input
          type="text"
          data-testid='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label>
          password
        <input
          type="password"
          value={password}
          data-testid='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <input type="submit" value="Login" />
    </form>

  )
}

export default Login
