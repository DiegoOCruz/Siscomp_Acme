import { List } from "@mui/material";
export default function ListComponent({children, ...props}) {
    return (
        <List {...props}>
            {children}
        </List>
    )
}