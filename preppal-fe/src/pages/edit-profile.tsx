import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const logo = require('../assets/logo.png')

function EditProfile() {
    const [userID, setID] = React.useState(0);
    const [userName, setName] = React.useState("");
    const [userPassword, setPassword] = React.useState("");
    const [userNewPassword, setNewPassword] = React.useState("");
    const [userBio, setBio] = React.useState("");
    const [userOwn, setOwn] = React.useState<any[]>([]);
    const [userSaved, setSaved] = React.useState<any[]>([]);
    const [userFollowing, setFollowing] = React.useState<any[]>([]);

    const navigate = useNavigate();

    React.useEffect(() => {
        fillUserContent();
        // eslint-disable-next-line
    }, []);

    //fill page content with user details
    const fillUserContent = async () => {
        const token = localStorage.getItem("token");
        try {
            if (token) {
                const req = {
                    method: "GET",
                    headers: {
                        "x-auth-token": token
                    }
                };
                const res = await fetch(process.env.REACT_APP_API_URL + "/api/auth/", req).then(res => res.json());
                setID(res._id);
                setName(res.username);
                setBio(res.bio);
                setOwn(res.ownRecipes);
                setSaved(res.savedRecipes);
                setFollowing(res.following);
            }
        } catch (err) {
            console.error(err);
        }
    };

    //Using inputted userPassword confirm the user,
    //if a new password was given update password and bio as requested if possible
    //else update given bio as requested if possible
    const updateUser = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        try {
            //Using inputted userPassword, confirm user ID
            if (token) {
                const req = {
                    method: "POST",

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        'username': userName,
                        'password': userPassword
                    })
                };
                const res = await fetch(process.env.REACT_APP_API_URL + "/api/auth/", req).then(res => res.json());
                if (res.token) {
                    if (token !== "undefined") {
                        try {
                            ////if a new password was given update password and bio as requested if possible
                            if (userNewPassword !== '') {
                                updateWithNew();
                            }
                            //else update given bio as requested if possible
                            else {
                                updateWithOld();
                            }
                        } catch (err) {
                            console.error(err);
                        }
                    }
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    const updateWithNew = async () => {
        try {
            const req = {
                method: "POST",

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    '_id': userID,
                    'username': userName,
                    'password': userNewPassword,
                    'bio': userBio,
                    'ownRecipes': userOwn,
                    'savedRecipes': userSaved,
                    'following': userFollowing
                })
            };
            const res = await fetch(process.env.REACT_APP_API_URL + "/api/users/updateUsers", req).then(res => res.json());
            if (res.errors) {
                alert(res.errors[0].msg);
            }
            else {
                navigate("/profile");
            }
        } catch (err) {
            console.error(err);
        }
    }

    const updateWithOld = async () => {
        try {
            const req = {
                method: "POST",

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    '_id': userID,
                    'username': userName,
                    'password': userPassword,
                    'bio': userBio,
                    'ownRecipes': userOwn,
                    'savedRecipes': userSaved,
                    'following': userFollowing
                })
            };
            const res = await fetch(process.env.REACT_APP_API_URL + "/api/users/updateUsers", req).then(res => res.json());
            if (res.errors) {
                alert(res.errors[0].msg);
            }
            else {
                navigate("/profile");
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='py-3'>
            <Row className='p-3 d-flex'>
                <div className="w-100" style={{ maxWidth: '2000px' }}>
                    <Card className="p-4 d-flex" style={{ backgroundColor: "#F2E8DC" }}>
                        <Card.Header className='d-flex align-items-center'>
                            <Col className='d-flex justify-content-start align-items-center'>
                                <Image src={logo} alt="Logo" rounded style={{ maxWidth: '200px' }} />
                                <Card.Title className='p-2'>{userName}</Card.Title>
                            </Col>
                            <Col>
                                <label className='d-flex justify-content-end'>Change profile pic /not implemented/</label>
                            </Col>
                        </Card.Header>
                        <Form onSubmit={updateUser}>
                            <Row>
                                <Col>
                                    <Form.Group title="inputOldPassword" controlId="formBasicOldPassword" style={{ maxWidth: '400px', paddingBottom: '8px' }}>
                                        <label className='p-2'>Old Password (required)</label>
                                        <Form.Control required type="password" placeholder="Old Password (required)" onChange={(event) => setPassword(event.target.value)} />
                                        <Form.Control.Feedback type="invalid">Please provide a valid state.</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group title="inputNewPassword" controlId="formBasicNewPassword" style={{ maxWidth: '400px', paddingBottom: '8px' }}>
                                        <label className='p-2'>New Password (Optional)</label>
                                        <Form.Control type="password" placeholder="New Password (Optional)" onChange={(event) => setNewPassword(event.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group title="inputBio" controlId="formBio" style={{ paddingBottom: '8px' }}>
                                <label className='p-2'>Profile's Bio</label>
                                <Form.Control type="text" defaultValue={userBio} onChange={(event) => setBio(event.target.value)} />
                            </Form.Group>
                            <div className="d-grid gap-2 justify-content-start">
                                <Button className="mx-auto" variant="primary" type="submit" title="Login" size="lg" style={{ backgroundColor: "#401E01" }}>
                                    Submit updates
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </div>
            </Row>
        </div>
    );
};

export default EditProfile;
