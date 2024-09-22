import InputLabel from '@mui/material/InputLabel';

export default function InputLabelComponent({children, ...props}) {
    return(
        <InputLabel {...props}>{children}</InputLabel>
    );
};