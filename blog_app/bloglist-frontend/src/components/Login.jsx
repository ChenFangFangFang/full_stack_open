import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import TextField from "@mui/material/TextField";

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
      <TextField
        id="filled-basic"
        label="username"
        variant="filled"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />

      <TextField
        type="password"
        id="filled-basic"
        label="username"
        variant="filled"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
