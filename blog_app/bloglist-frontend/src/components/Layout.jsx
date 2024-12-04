import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
const Layout = ({ children, user, handleLogout }) => {
  const pages = ["Home", "Users"];

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },

                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
              BLOG
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  to={`/${page.toLowerCase()}`}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <div>{user && <div>{user.name} logged in</div>}</div>
            <Button color="inherit" onClick={handleLogout}>
              Log out
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <div>{children}</div> {/* Render page-specific content here */}
    </div>
  );
};

export default Layout;
