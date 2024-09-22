import Stack from "@mui/material/Stack";
export default function StackComponent({children, ...props}) {
  return (
    <Stack {...props}>
      {children}
    </Stack>
  );
}