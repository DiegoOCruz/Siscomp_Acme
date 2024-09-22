import { TableRow } from "@mui/material";
export default function TableRowComponent({ children, ...props }) {
  return <TableRow {...props}>{children}</TableRow>;
}