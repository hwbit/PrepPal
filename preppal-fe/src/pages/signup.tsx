import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const logo = require('../assets/logo.png')

const Signup = () => {

    const navigate = useNavigate();

    //Logic to stop submission on incomplete form. 
    //React bootstrap offical validation code for forms
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
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
                }),
            };
            const res = await fetch("http://localhost:9001/api/users/createUsers", req).then(res => res.json());
            localStorage.setItem("token", res.token);
        } catch (err) {
            alert("something went wrong");
        }
        const token = localStorage.getItem("token");
        if (token) {
            if (token === "undefined") {
                alert("username already exists");
            }
            else {
                navigate("/");
            }

        }
        setValidated(true);
    };//end of React bootstrap offical validation code for forms

    return (
        <Container className="d-flex align-items-center justify-content-center">
            <Card className="p-4 w-100" style={{ margin: '40px', backgroundColor: "#F2E8DC", maxWidth: '450px', height: '650px' }}>
                <div style={{ maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <div className="text-center m-4">
                        <Image src={logo} alt="Logo" width={300} height={250} style={{ maxWidth: '100%', height: 'auto' }} rounded />
                    </div>
                    <h2 className="text-center mb-4" style={{ paddingBottom: '32px' }} > Create your account</h2>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group title="inputUsername" controlId="formUser" style={{ paddingBottom: '28px' }}>
                            <Form.Control required type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
                            <Form.Control.Feedback type="invalid">Please enter a username.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group title="inputPassword" controlId="formBasicPassword" style={{ paddingBottom: '28px' }}>
                            <Form.Control required type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                            <Form.Control.Feedback type="invalid">Please enter a password.</Form.Control.Feedback>
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button className="mx-auto" variant="primary" type="submit" title="SignUp" size="lg">
                                Sign up
                            </Button>
                        </div>
                    </Form>
                </div>
            </Card>
        </Container >
    );
};

export default Signup;
