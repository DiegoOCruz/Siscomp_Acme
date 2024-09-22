import { Container } from "@mui/material";
export default function ContainerComponent({children, ...props}) {
    return (
        <Container {...props}>
            {children}
        </Container>
    )
}