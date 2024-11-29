import { Link } from "react-router-dom";

const Layout = ({ children, user, handleLogout }) => {
  const padding = { padding: 5 };

  return (
    <div>
      <div>
        <Link style={padding} to="/">
          Home
        </Link>
        <Link style={padding} to="/users">
          Users
        </Link>
      </div>
      <h1>Blogs</h1>
      <div>{user && <div>{user.name} logged in</div>}</div>
      <button onClick={handleLogout}>Logout</button>
      <div>{children}</div> {/* Render page-specific content here */}
    </div>
  );
};

export default Layout;
