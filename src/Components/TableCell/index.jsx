import { TableCell } from "@mui/material";
export default function TableCellComponent({ children, ...props }) {
  return <TableCell {...props}>{children}</TableCell>;
}