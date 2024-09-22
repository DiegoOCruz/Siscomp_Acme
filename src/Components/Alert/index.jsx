import Alert from '@mui/material/Alert';

export default function AlertComponent({children, ...props}) {
  return <Alert {...props}>{children}</Alert>;
}