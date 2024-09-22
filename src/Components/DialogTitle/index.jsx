import DialogTitle from "@mui/material/DialogTitle";
export default function DialogTitleComponent({children, ...props}) {
    return (
        <DialogTitle {...props}>
            {children}
        </DialogTitle>
    );
}