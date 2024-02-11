import { useState } from 'react';
import { Container, Form, Button, Card, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const logo = require('../assets/logo.png')

const LoginPage = () => {

    // For Forms
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const loginClick = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const req = {
                method: "POST",

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    'username': username,
                    'password': password
                })
            };

            const res = await fetch("http://localhost:9001/api/auth/", req).then(res => res.json());
            localStorage.setItem("token", res.token);
        }
        catch (err) {
            console.error(err);
            console.log("something went wrong");
        }
        const token = localStorage.getItem("token");
        if (token) {
            if (token === "undefined") {
                alert("Wrong username or password");
            }
            else {
                navigate("/home");
            }
        }
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <Card className="p-4" style={{ backgroundColor: "#F2E8DC" }}>
                    <div className="text-center mb-4">
                        <Image src={logo} alt="Logo" rounded />
                    </div>
                    <h2 className="text-center mb-4">Sign in</h2>
                    <Form onSubmit={loginClick}>
                        <Form.Group controlId="formUser" style={{ paddingBottom: '16px' }}>
                            <Form.Control type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" style={{ paddingBottom: '8px' }}>
                            <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
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
