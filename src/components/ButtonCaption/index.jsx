import { Container } from "./styles";

export function ButtonCaption({ children, ...rest }) {
    return (
        <Container
            type="button"
            {...rest}
        >
            {children}
        </Container>
    );

}