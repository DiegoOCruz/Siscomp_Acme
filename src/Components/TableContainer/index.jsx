import { TableContainer } from "@mui/material";
export default function TableContainerComponent({ children, ...props }) {
  return <TableContainer {...props}>{children}</TableContainer>;
}