import DialogContent from "@mui/material/DialogContent";
export default function DialogContentComponent({children, ...props}) {
    return (
        <DialogContent {...props}>
            {children}
        </DialogContent>
    );
}