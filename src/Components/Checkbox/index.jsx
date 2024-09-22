import {Checkbox} from "@mui/material";
export default function CheckboxComponent({children, ...props}) {
  return (
    <Checkbox {...props}>{children}</Checkbox>
  );
}