import { Typography } from '@mui/material';
export default function TypographyCompponent({ children, ...props }) {
    return (
        <Typography {...props}>
            {children}
        </Typography>
    );
}