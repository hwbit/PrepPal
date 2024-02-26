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
        } catch (err) {
            console.error(err);
        }
        const token = localStorage.getItem("token");
        if (token) {
            if (token === "undefined") {
                alert("Wrong username or password");
            }
            else {
                navigate("/");
            }
        }
    }

    return (
        <Container className="d-flex align-items-center justify-content-center">
            <Card className="p-4 w-100" style={{ margin: '40px', backgroundColor: "#F2E8DC", maxWidth: '450px', height: '650px' }}>
                <div style={{ maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <div className="text-center m-4">
                        <Image src={logo} alt="Logo" width={300} height={250} style={{ maxWidth: '100%', height: 'auto' }} rounded />
                    </div>
                    <h2 className="text-center mb-4">Sign in</h2>
                    <Form onSubmit={loginClick}>
                        <Form.Group title="inputUsername" controlId="formUser" style={{ paddingBottom: '16px' }}>
                            <Form.Control type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
                        </Form.Group>

                        <Form.Group title="inputPassword" controlId="formBasicPassword" style={{ paddingBottom: '8px' }}>
                            <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                        </Form.Group>

                        <Form.Group title="checkboxRememberMe" controlId="formBasicCheckbox" style={{ paddingBottom: '8px' }}>
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
                </div>
            </Card>
        </Container>
    );
};

export default LoginPage;
