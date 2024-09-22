import Table from '@mui/material/Table'
export default function TableComponent({children, ...props}) {

  return (
    <Table {...props}>{children}</Table>
  );
}
