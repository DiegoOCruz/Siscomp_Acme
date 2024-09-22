import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

export default function HomeButton({ children, ...props }) {
  return (
    <Button
      {...props}
      startIcon={<HomeIcon />}
      variant="outlined"
      component={Link}
      to="/"
      sx={{ marginRight: "10px" }}
    >
      HOME
    </Button>
  );
}
