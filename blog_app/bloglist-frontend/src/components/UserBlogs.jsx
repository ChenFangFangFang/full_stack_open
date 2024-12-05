import { useParams } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserById } from "../reducers/allUsersReducer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
const UserBlogs = () => {
  const { id } = useParams();
  console.log("User ID from URL:", id);

  const dispatch = useDispatch();
  const user = useSelector((state) =>
    state.users.users.find((user) => user.id === id)
  );
  console.log("User from Redux:", user);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserById(id));
    }
  }, [user, id, dispatch]);
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <List>
        {user.blogs.length === 0 ? (
          <p>There is no blog so far</p>
        ) : (
          <div>
            {user.blogs.map((blog) => (
              <React.Fragment key={blog.id}>
                <ListItem
                  disablePadding
                  primary={blog.title}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemButton>
                    <ListItemText primary={blog.title} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </div>
        )}
      </List>
    </div>
  );
};
export default UserBlogs;
