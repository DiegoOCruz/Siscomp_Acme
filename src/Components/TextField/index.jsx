import {TextField} from '@mui/material';

export default function TextfieldComponent({ children, ...props }) {
    return (
        <TextField {...props}>{children}</TextField>
    );
}