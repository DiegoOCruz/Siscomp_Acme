import Dialog from "@mui/material/Dialog";
export default function DialogComponent({children, ...props}) {
    return (
        <Dialog {...props}>
            {children}
        </Dialog>
    );
}