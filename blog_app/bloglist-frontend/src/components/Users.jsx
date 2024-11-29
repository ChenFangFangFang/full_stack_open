import users from "../services/users";
import { useSelector, useDispatch } from "react-redux";
import { initializeUsers } from "../reducers/allUsersReducer";
import { useEffect } from "react";
const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);
  console.log("All users: ", users);
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default Users;
