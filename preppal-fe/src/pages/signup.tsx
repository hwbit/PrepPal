import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { useState } from 'react';

const logo = require('../assets/logo.png')

function Signup() {

    //Logic to stop submission on incomplete form. 
    //React bootstrap offical validation code for forms
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            //custom code if valid
            //This could take input of form, try insert of user. If success, login and send user to home. Else, fail and retry.
        }
        setValidated(true);
    };//end of React bootstrap offical validation code for forms

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <Card className="p-4" style={{ backgroundColor: "#F2E8DC" }}>
                    <div className="text-center mb-4">
                        <Image src={logo} alt="Logo" rounded />
                    </div>
                    <h2 className="text-center mb-4">Create your account</h2>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group controlId="formUser" style={{ paddingBottom: '16px' }}>
                            <Form.Control required type="text" placeholder="Username" />
                            <Form.Control.Feedback type="invalid">Please enter a Username.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" style={{ paddingBottom: '16px' }}>
                            <Form.Control required type="password" placeholder="Password" />
                            <Form.Control.Feedback type="invalid">Please enter a password.</Form.Control.Feedback>
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button className="mx-auto" variant="primary" type="submit" title="SignUp" size="lg">
                                Sign up
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>
        </Container>
    );
};

export default Signup;
