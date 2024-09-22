import { ListItem } from "@mui/material";
export default function ListItemComponent({children, ...props}) {
    return (
        <ListItem {...props}>
            {children}
        </ListItem>
    )
}