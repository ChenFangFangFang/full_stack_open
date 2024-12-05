import { useState, forwardRef, useImperativeHandle } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });
  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant="outlined"
          onClick={toggleVisibility}
          sx={{ my: 2, display: "block" }}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="outlined"
          size="small"
          onClick={toggleVisibility}
          startIcon={<DeleteIcon />}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
