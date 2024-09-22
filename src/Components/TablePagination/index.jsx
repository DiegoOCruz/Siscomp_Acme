import { TablePagination } from "@mui/material";
export default function TablePaginationComponent({ children, ...props }) {
  return <TablePagination {...props}>{children}</TablePagination>;
}