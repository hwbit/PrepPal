
import { Container, Form, Button, Card, Image} from 'react-bootstrap';
const logo = require('../assets/logo.png')

const LoginPage = () => {

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <Card className="p-4" style={{ backgroundColor: "#F2E8DC" }}>
                    <div className="text-center mb-4">
                        <Image src={logo} alt="Logo" rounded />
                    </div>
                    <h2 className="text-center mb-4">Sign into PrepPal</h2>
                    <Form>
                        <Form.Group controlId="formUser" style={{ paddingBottom: '16px' }}>
                            <Form.Control type="text" placeholder="Username" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" style={{ paddingBottom: '8px' }}>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox" style={{ paddingBottom: '8px' }}>
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button className="mx-auto" variant="primary" type="submit" title="Login" size="lg">
                                Login
                            </Button>
                        </div>
                    </Form>
                    <div className="mt-3 text-center">
                        <p>Don't have an account? <a href="/signup">Sign up</a></p>
                    </div>
                </Card>
            </div>
        </Container>
    );
};

export default LoginPage;
