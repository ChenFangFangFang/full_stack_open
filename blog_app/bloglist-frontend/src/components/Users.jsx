import { useSelector, useDispatch } from "react-redux";
import { initializeUsers } from "../reducers/allUsersReducer";
import { useEffect } from "react";
import ShowUsers from "./ShowUsers";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);
  console.log("All users: ", users);

  return (
    <div>
      <ShowUsers users={users} />
    </div>
  );
};
export default Users;
