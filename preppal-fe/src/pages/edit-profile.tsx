import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import NavBar from '../components/nav-bar/nav-bar';

const backendBaseURL = process.env.REACT_APP_BACKEND_BASE_URL;

function EditProfile() {
    const [userID, setID] = React.useState('');
    const [userName, setName] = React.useState("");
    const [userPassword, setPassword] = React.useState("");
    const [userNewPassword, setNewPassword] = React.useState("");
    const [userBio, setBio] = React.useState("");
    const [userImage, setImage] = React.useState();
    const [uploadedImage, setUploadedImage] = React.useState('');

    const navigate = useNavigate();

    React.useEffect(() => {
        fillUserContent();
        // eslint-disable-next-line
    }, []);

    //fill page content with user details
    const fillUserContent = async () => {
        const token = sessionStorage.getItem("token");
        try {
            if (token && token !== "undefined") {
                const req = {
                    method: "GET",
                    headers: {
                        "x-auth-token": token
                    }
                };
                const res = await fetch(backendBaseURL+"/api/auth/", req).then(res => res.json());
                setID(res._id);
                setName(res.username);
                setBio(res.bio);
                setImage(res.image);
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
        const token = sessionStorage.getItem("token");
        try {
            //Using inputted userPassword, confirm user ID
            if (token && token !== "undefined") {
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
                const res = await fetch(backendBaseURL+"/api/auth/", req).then(res => res.json());
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
            const formBody = new FormData();
            formBody.append("_id", userID);
            formBody.append("username", userName);
            formBody.append("password", userNewPassword);
            formBody.append("bio", userBio);
            formBody.append("imageRaw", uploadedImage);

            const req = {
                method: "POST",
                body: formBody
            };

            const res = await fetch(backendBaseURL+"/api/users/updateUser", req).then(res => res.json());
          
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
            const formBody = new FormData();
            formBody.append('_id', userID);
            formBody.append('username', userName);
            formBody.append('password', userPassword);
            formBody.append('bio', userBio);
            formBody.append('imageRaw', uploadedImage);

            const req = {
                method: "POST",
                body: formBody
            };
            const res = await fetch(backendBaseURL+"/api/users/updateUser", req).then(res => res.json());
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

    const handleImageUpload = (event: any) => {
        setUploadedImage(event.target.files[0]);
    }

    return (
        <><NavBar></NavBar><div className='py-3'>
            <Row className='p-3 d-flex'>
                <div className="w-100" style={{ maxWidth: '2000px' }}>
                    <Card className="p-4 d-flex" style={{ backgroundColor: "#F2E8DC" }}>
                        <Card.Header className='d-flex align-items-center'>
                            <Col className='d-flex justify-content-start align-items-center'>
                                <Image src={userImage} alt="userImage" rounded style={{ maxWidth: '200px' }} />
                                <Card.Title className='p-2'>{userName}</Card.Title>
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
                            <Form.Group title="uploadPic" controlId="formPic" style={{ paddingBottom: '8px' }}>
                                <label className='p-2'>Profile Picture (Optional)</label>
                                <Form.Control type="file" accept="image/*" name="image" onChange={handleImageUpload} />
                            </Form.Group>
                            <Form.Group title="inputBio" controlId="formBio" style={{ paddingBottom: '8px' }}>
                                <label className='p-2'>Profile's Bio</label>
                                <Form.Control type="text" defaultValue={userBio} onChange={(event) => setBio(event.target.value)} />
                            </Form.Group>
                            <div className="d-grid gap-2 justify-content-start">
                                <Button className="mx-auto" variant="primary" type="submit" title="SubmitUpdate" size="lg" style={{ backgroundColor: "#401E01" }}>
                                    Submit updates
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </div>
            </Row>
        </div></>
    );
};

export default EditProfile;
