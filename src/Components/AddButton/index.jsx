import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function AddButton({children,...props}) {
  return (
    <Button
      {...props}
      component={Link}
      to={props.to}
      variant="outlined"
      color="secondary"
      sx={{ marginRight: "10px" }}
      startIcon={<AddIcon />}
    >
      {children}
    </Button>
  );
}
