import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const ShowUsers = () => {
  const users = useSelector((state) => state.users.users); // Get users from Redux store
  return (
    <Box sx={{ marginTop: 5, paddingX: 2 }}>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 800, margin: "0 auto", padding: "10", borderRadius: 2 }}
      >
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="right">Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link
                    to={`/users/${user.id}`}
                    style={{ textDecoration: "none", color: "#1976d2" }}
                  >
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell align="right">{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default ShowUsers;
