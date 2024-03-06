import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Button, Col, Row, Stack } from 'react-bootstrap';
import React from 'react';
import NavBar from '../components/nav-bar/nav-bar';
import RecipeCatalog from '../components/recipe-catalog/recipe-catalog';

const logo = require('../assets/logo.png')

function Profile() {
    const [username, setUsername] = React.useState("");
    const [userBio, setBio] = React.useState("");
    const [userFollowing, setFollowing] = React.useState<any[]>([]);
    const [userFollowingCount, setFollowingCount] = React.useState(0);
    const [recipes, setRecipes] = React.useState<any[]>([]);

    const matches = window.location.href.match(/\/profile\/(.+)/);
    const query = matches ? decodeURI(matches[1]) : "";
    const myProfile = (query === "");

    React.useEffect(() => {
        fillUserContent();
        // eslint-disable-next-line
    }, [query]);

    const fillUserContent = async () => {
        const token = sessionStorage.getItem("token");
        try {
            let res;
            if (myProfile) {
                if (token) {
                    const req = {
                        method: "GET",
                        headers: {
                            "x-auth-token": token
                        }
                    };
                    res = await fetch("http://localhost:9001/api/auth/", req).then(res => res.json());
                    if (res) {
                        setUsername(res.username);
                        setBio(res.bio);
                        setFollowing(res.following);
                        setFollowingCount(userFollowing.length)
                    }
                }
            }
            else {
                const req = {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json"
                    }
                };
                res = await fetch("http://localhost:9001/api/users/lookup/" + query, req).then(res => res.json());
                if (res) {
                    setUsername(res.username);
                    setBio(res.bio);
                    setFollowingCount(res.following.length);
                    setRecipes(res.recipes);
                }
            }

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <><NavBar></NavBar>
            <div className='py-3'>
                <Row className='p-3 d-flex'>
                    <div className="w-100" style={{ maxWidth: '2000px' }}>
                        <Card className="p-4 d-flex" style={{ backgroundColor: "#F2E8DC" }}>
                            <Card.Header className='d-flex align-items-center'>
                                <Col className='d-flex justify-content-start align-items-center'>
                                    <Image src={logo} alt="Logo" rounded style={{ maxWidth: '200px' }} />
                                    <Card.Title className='p-2'>{username}</Card.Title>
                                </Col>
                                <Col>
                                    <Stack gap={3}>
                                        <div className='d-flex justify-content-end'>
                                            {myProfile && (<Button className='d-flex' variant="primary" href="edit-profile" title="Edit" size="sm" style={{ maxWidth: '40px', backgroundColor: "#401E01" }}>Edit</Button>)}
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
                                <Card.Title>{myProfile ? "Following" : "Recipes"}</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {myProfile ? userFollowing : <RecipeCatalog catalog={recipes}></RecipeCatalog>}
                            </Card.Body>
                        </Card>
                    </div>
                </Row>
            </div></>
    );
};

export default Profile;
