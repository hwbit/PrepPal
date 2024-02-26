import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Button, Col, Row, Stack } from 'react-bootstrap';
import React from 'react';

const logo = require('../assets/logo.png')

function Profile() {
    const [userName, setName] = React.useState("");
    const [userBio, setBio] = React.useState("");
    const [userFollowing, setFollowing] = React.useState<any[]>([]);
    const [userFollowingCount, setFollowingCount] = React.useState(0);
    React.useEffect(() => {
        fillUserContent();
        // eslint-disable-next-line
    }, []);

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
                setName(res.username);
                setBio(res.bio);
                setFollowing(res.following);
                setFollowingCount(userFollowing.length)
            }
        } catch (err) {
            console.error(err);
        }
    };

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
                                <Stack gap={3}>
                                    <div className='d-flex justify-content-end'>
                                        <Button className='d-flex' variant="primary" href="edit-profile" title="Edit" size="sm" style={{ maxWidth: '40px', backgroundColor: "#401E01" }}>Edit</Button>
                                    </div>
                                    <Card.Subtitle className='d-flex justify-content-end'>Following: {userFollowingCount}</Card.Subtitle>
                                </Stack>
                            </Col>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>Bio</Card.Title>
                            <Card.Subtitle>{userBio}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                </div>
            </Row>
            <Row className='px-3'>
                <div className="w-100" style={{ maxWidth: '2000px' }}>
                    <Card className="p-4" style={{ backgroundColor: "#F2E8DC" }}>
                        <Card.Header>
                            <Card.Title>Following</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>{userFollowing}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </Row>
        </div>
    );
};

export default Profile;
