import Grid from '@mui/material/Grid';
export default function GridComponent({ children, ...props }) {
    return (
        <Grid {...props}>{children}</Grid>
    );
}