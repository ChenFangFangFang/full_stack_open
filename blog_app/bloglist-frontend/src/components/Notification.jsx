const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }
  const { message, type } = notification;
  const notificationStyle = {
    backgroundColor: "lightgrey",
    margin: "10px",
    padding: "10px",
    border: "2px solid",
    borderColor: type === "success" ? "green" : "red",
    borderRadius: "5px"
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
