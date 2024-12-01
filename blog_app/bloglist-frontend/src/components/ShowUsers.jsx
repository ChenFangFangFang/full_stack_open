import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const ShowUsers = () => {
  const users = useSelector((state) => state.users.users); // Get users from Redux store
  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Blogs Created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ShowUsers;
