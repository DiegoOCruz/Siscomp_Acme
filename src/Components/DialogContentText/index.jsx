import DialogContentText from "@mui/material/DialogContentText";
export default function DialogContentTextComponent({children, ...props}) {
    return (
        <DialogContentText {...props}>
            {children}
        </DialogContentText>
    );
}