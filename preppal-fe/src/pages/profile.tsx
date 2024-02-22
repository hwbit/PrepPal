import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Button, Col, Row, Stack } from 'react-bootstrap';
import RecipeCard from '../components/recipe-card/recipe-card';
import React from 'react';

const logo = require('../assets/logo.png')

function Profile() {
    const [userName, setName] = React.useState("");
    const [userBio, setBio] = React.useState("");
    const [userFollowing, setFollowing] = React.useState<any[]>([]);
    const [userFollowingCount, setFollowingCount] = React.useState(0);
    const [recipes, setRecipes] = React.useState<any[]>([]);
    React.useEffect(() => {
        fillUserContent();
        fillRecipes();
    }, []);

    const fillUserContent = async () => {
        try {
            const req = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const curUserName = localStorage.getItem("curUserName");
            const curUser = await fetch("http://localhost:9001/api/users/lookup/test11", req).then((res) => res.json());
            //remove this api and use a completely different api
            setName(curUser.user[0].username);
            setBio(curUser.user[0].bio);
            setFollowing(curUser.user[0].following);
            setFollowingCount(userFollowing.length)
        } catch (err) {
            console.error(err);
        }
    };

    const fillRecipes = async () => {
        try {
            const req = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const fetchedRecipes = await fetch("http://localhost:9001/api/recipes/lookupAuthor/test11", req).then((res) => res.json());
            //remove test11 and update with username
            setRecipes(fetchedRecipes);
        } catch (err) {
            console.error(err);
        }
    };

    function edit(): React.FormEventHandler<HTMLLabelElement> | undefined {
        console.log("Edit was clicked")
        //will either go to new page for edits, or will make this page editable
        return
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
                                <Stack gap={3}>
                                    <div className='d-flex justify-content-end'>
                                        <Button className='d-flex' variant="primary" type="submit" title="Edit" size="sm" style={{ maxWidth: '40px', backgroundColor: "#401E01" }}>Edit</Button>
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
                            <Card.Title>Recipes</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row xs="auto" md="auto" lg="auto">
                                {recipes.filter(recipe => recipe.isPublic).map((recipe) => (
                                    <Col key={recipe._id}>
                                        {RecipeCard(recipe)}
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
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
