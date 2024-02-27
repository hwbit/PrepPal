import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import RecipeCard from '../components/recipe-card/recipe-card';
import NavBar from '../components/nav-bar/nav-bar';

const Collections = () => {
    const [username, setUsername] = useState("");
    const [recipes, setRecipes] = useState<any[]>([]);
    const [myRecipes, setMyRecipes] = useState(true);

    React.useEffect(() => {
        getUser();
        fillRecipes(myRecipes);
        // eslint-disable-next-line
    }, [username, myRecipes]);

    const getUser = async () => {
        const token = localStorage.getItem("token");
        try {
            if (token) {
                const req = {
                    method: "GET",
                    headers: {
                        "x-auth-token": token
                    }
                };

                const res = await fetch("http://localhost:9001/api/auth/", req).then(res => res.json());
                setUsername(res.username);
            }

        } catch (err) {

        }
    };

    const fillRecipes = async (myRecipes: boolean) => {
        try {
            if (myRecipes && username !== "") {
                const req = {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                const fetchedRecipes = await fetch("http://localhost:9001/api/recipes/lookupAuthor/" + username, req).then((res) => res.json());
                setRecipes(fetchedRecipes);
            } else {
                setRecipes([]);
            }

        } catch (err) {
            console.error(err);
        }
    };

    function handleSelect(key: string | null): void {
        if (key === "MyRecipes") {
            setMyRecipes(true);
        } else {
            setMyRecipes(false);
        }
    }

    return (
        <><NavBar></NavBar>
        <div className='collections-page'>
            <Tabs
                defaultActiveKey="MyRecipes"
                id="collections"
                onSelect={key => handleSelect(key)}>
                <Tab eventKey="MyRecipes" title="My Recipes">
                    <Row xs="auto" md="auto" lg="auto">
                        {recipes.filter(recipe => recipe.isPublic).map((recipe) => (
                            <Col key={recipe._id}>
                                {RecipeCard(recipe)}
                            </Col>
                        ))}
                    </Row>
                </Tab>
                <Tab eventKey="Favourites" title="Favourites">
                    <Row xs="auto" md="auto" lg="auto">
                        {recipes.filter(recipe => recipe.isPublic).map((recipe) => (
                            <Col key={recipe._id}>
                                {RecipeCard(recipe)}
                            </Col>
                        ))}
                    </Row>
                </Tab>
            </Tabs>
        </div></>
    )
}

export default Collections;
