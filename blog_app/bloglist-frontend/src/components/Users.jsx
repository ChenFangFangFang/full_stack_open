import { useSelector, useDispatch } from "react-redux";
import { initializeUsers } from "../reducers/allUsersReducer";
import { useEffect } from "react";

const ShowUsersBlog = ({ users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>BLogs Created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
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
      <ShowUsersBlog users={users} />
    </div>
  );
};
export default Users;
