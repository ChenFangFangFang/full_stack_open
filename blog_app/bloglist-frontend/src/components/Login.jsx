import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

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
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f4f8",
        padding: 2
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            Welcome Back!
          </Typography>
          <Typography
            variant="body2"
            align="center"
            gutterBottom
            sx={{ color: "gray" }}
          >
            Please log in to continue
          </Typography>
          <form onSubmit={handleLogin}>
            <div>
              <TextField
                fullWidth
                id="username"
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                defaultValue="Small"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              <TextField
                fullWidth
                type="password"
                id="password"
                label="Password"
                variant="outlined"
                defaultValue="Small"
                margin="normal"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              value="Login"
              margin="normal"
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
