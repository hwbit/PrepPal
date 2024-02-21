import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import RecipeCard from '../components/recipe-card/recipe-card';

const Collections = () => {

    const [recipes, setRecipes] = useState<any[]>([]);
    const [myRecipes, setMyRecipes] = useState(true);

    React.useEffect(() => {
        fillRecipes(myRecipes);
    }, [myRecipes]);

    const fillRecipes = async (myRecipes: boolean) => {
        try {
            if (myRecipes) {
                const req = {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                const fetchedRecipes = await fetch("http://localhost:9001/api/recipes/", req).then((res) => res.json());
                setRecipes(fetchedRecipes);
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
        <div className='collections-page'>
            < Tabs
                defaultActiveKey="MyRecipes"
                id="collections"
                onSelect={key => handleSelect(key)}>
                <Tab eventKey="MyRecipes" title="My Recipes">
                    TESTING MY RECIPES
                    <Row xs="auto" md="auto" lg="auto">
                        {recipes.filter(recipe => recipe.isPublic).map((recipe) => (
                            <Col key={recipe._id}>
                                {RecipeCard(recipe)}
                            </Col>
                        ))}
                    </Row>
                </Tab>
                <Tab eventKey="Favourites" title="Favourites">
                    TESTING FAVOURITES
                    <Row xs="auto" md="auto" lg="auto">
                        {recipes.filter(recipe => recipe.isPublic).map((recipe) => (
                            <Col key={recipe._id}>
                                {RecipeCard(recipe)}
                            </Col>
                        ))}
                    </Row>
                </Tab>
            </Tabs >
        </div >
    )
}

export default Collections;
