import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";

const Login = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login({ username, password });
      dispatch(setUser(user));
      window.localStorage.setItem("loggedUser", JSON.stringify(user)); // Optional: persist user
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <label>
        username
        <input
          type="text"
          data-testid="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label>
        password
        <input
          type="password"
          value={password}
          data-testid="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
