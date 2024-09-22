import InputAdornment from '@mui/material/InputAdornment';
export default function InputAdornmentComponent({children, ...props}) {
    return (
        <InputAdornment {...props}>
            {children}
        </InputAdornment>
    );
}