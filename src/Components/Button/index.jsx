import { Button  } from "@mui/material";
export default function ButtonComponent({ children, ...props }) {
    return (
        <Button variant="contained" {...props}>{children}</Button>
    );
}