import FormControl from '@mui/material/FormControl';

export default function FormControlComponent({children, ...props}) {
    return(
        <FormControl {...props}>{children}</FormControl>
    );
}