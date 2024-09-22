import { TableHead } from "@mui/material";
export default function TableHeadComponent({ children, ...props }) {
  return <TableHead {...props}>{children}</TableHead>;
}