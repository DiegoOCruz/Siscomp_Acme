import MenuItem from '@mui/material/MenuItem';

export default function MenuItemComponent({children, ...props}) {
    return(
        <MenuItem {...props}>{children}</MenuItem>
    );
}