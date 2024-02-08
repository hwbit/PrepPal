import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

const logo = require('../assets/logo.png')

function Register() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="w-100" style={{ maxWidth: '400px' }}>
            <Card className="p-4" style={{ backgroundColor: "#F2E8DC" }}>
                <div className="text-center mb-4">
                    <Image src={logo} alt="Logo" rounded />

                </div>
                <h2 className="text-center mb-4">Register</h2>
                <Form>
                    <Form.Label>Username</Form.Label>
                    <Form.Group controlId="formUser" style={{ paddingBottom: '16px' }}>
                        <Form.Control type="text" placeholder="Username" />
                    </Form.Group>

                    <Form.Label>Password</Form.Label>
                    <Form.Group controlId="formBasicPassword" style={{ paddingBottom: '8px' }}>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Group controlId="formConfirmBasicPassword" style={{ paddingBottom: '8px' }}>
                        <Form.Control type="password" placeholder="Confirm Password" />
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button className="mx-auto" variant="primary" type="submit" title="Login" size="lg" href='/home'>
                            Register
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    </Container>
  );
};

export default Register;
