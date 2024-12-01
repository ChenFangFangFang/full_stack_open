import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserById } from "../reducers/allUsersReducer";
const UserBlogs = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) =>
    state.users.users.find((user) => user.id === id)
  ); // Get users from Redux store

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserById(id));
    }
  }, [user, id, dispatch]);
  if (!user) {
    return <p>User not found.</p>;
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
