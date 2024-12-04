import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Layout = ({ children, user, handleLogout }) => {
  const navStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderBottom: "1px solid #ccc"
  };
  const linkStyle = {
    padding: "5px 10px",
    textDecoration: "none",
    color: "blue"
  };
  const userInfoStyle = {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  };

  return (
    <div>
      <div style={navStyle}>
        <Link style={linkStyle} to="/">
          Home
        </Link>
        <Link style={linkStyle} to="/users">
          Users
        </Link>
        <div style={userInfoStyle}></div>
        {user && <div>{user.name} logged in</div>}
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Typography variant="h5" gutterBottom>
        Blog Application
      </Typography>
      <div>{children}</div> {/* Render page-specific content here */}
    </div>
  );
};

export default Layout;
