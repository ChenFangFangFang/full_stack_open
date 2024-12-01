import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserById } from "../reducers/allUsersReducer";
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
      {user.blogs.length === 0 ? (
        <p>There is no blog so far</p>
      ) : (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default UserBlogs;
