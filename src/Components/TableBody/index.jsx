import { TableBody } from "@mui/material";
export default function TableBodyComponent({ children, ...props }) {
  return <TableBody {...props}>{children}</TableBody>;
}