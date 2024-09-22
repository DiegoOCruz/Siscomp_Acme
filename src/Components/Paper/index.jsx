import { Paper } from '@mui/material'
export default function PapperComponent({children, ...props}) {

  return (
    <Paper {...props}>{children}</Paper>
  );
}