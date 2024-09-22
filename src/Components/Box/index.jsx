import {Box} from '@mui/material';
export default function BoxComponent({children, ...props}) {
    return (
        <Box {...props}>
        {children}
        </Box>
    );
}