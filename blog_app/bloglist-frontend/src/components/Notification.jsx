import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification); // Fetch notification from Redux store
  if (!notification) {
    return null; // Don't render anything if there's no notification
  }
  const style = {
    backgroundColor:
      notification.type === "error" ? "lightcoral" : "lightgreen",
    margin: "10px",
    padding: "10px",
    border: "2px solid",
    borderRadius: "5px"
  };

  return <div style={style}>{notification.message}</div>;
};

export default Notification;
