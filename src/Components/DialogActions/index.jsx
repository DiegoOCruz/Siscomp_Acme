import DialogActions from "@mui/material/DialogActions";
export default function DialogActionsComponent({children, ...props}) {
    return (
        <DialogActions {...props}>
            {children}
        </DialogActions>
    );
}