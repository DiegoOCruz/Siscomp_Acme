import Select from '@mui/material/Select';

export default function SelectComponent({children, ...props}) {
    return(
        <Select {...props}>{children}</Select>
    );
}