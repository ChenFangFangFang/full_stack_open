import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import Box from "@mui/material/Box";
const Notification = () => {
  const notification = useSelector((state) => state.notification); // Fetch notification from Redux store
  if (!notification) {
    return null; // Don't render anything if there's no notification
  }
  const iconMapping = {
    success: <CheckIcon fontSize="inherit" />,
    error: <ErrorIcon fontSize="inherit" />,
    info: <InfoIcon fontSize="inherit" />,
    warning: <WarningIcon fontSize="inherit" />
  };
  const colorMapping = {
    success: "#4caf50", // Green
    error: "#f44336", // Red
    info: "#2196f3", // Blue
    warning: "#ff9800" // Orange
  };

  return (
    <Alert
      severity={notification.type}
      icon={iconMapping[notification.type]}
      sx={{
        backgroundColor: `${colorMapping[notification.type]}20`, // Light background based on type
        color: colorMapping[notification.type], // Text color based on type
        fontWeight: "bold",
        marginTop: 2
      }}
    >
      {notification.message}
    </Alert>
  );
};

export default Notification;
