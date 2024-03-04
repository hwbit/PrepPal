import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import React from 'react';
import RecipeCard from '../components/recipe-card/recipe-card';
import NavBar from '../components/nav-bar/nav-bar';

const Collections = () => {
    const [username, setUsername] = React.useState("");
    const [ownRecipes, setOwnRecipes] = React.useState<any[]>([]);
    const [savedRecipes, setSavedRecipes] = React.useState<any[]>([]);
    const [key, setKey] = React.useState("MyRecipes");

    React.useEffect(() => {
        getUser().then(result => setUsername(result));
        getOwnRecipes().then(result => setOwnRecipes(result));
        getSavedRecipes().then(result => setSavedRecipes(result));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    async function getUser() {
        const token = sessionStorage.getItem("token");
        try {
            if (token) {
                const req = {
                    method: "GET",
                    headers: {
                        "x-auth-token": token
                    }
                };

                const res = await fetch("http://localhost:9001/api/auth/", req).then(res => res.json());
                return res.username;
            }

            return "";

        } catch (err) {

        }
    };

    async function getOwnRecipes() {
        let fetchedRecipes: any[] = [];
        try {
            let fetchedRecipes = [];
            if (username !== "") {
                const req = {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                fetchedRecipes = await fetch("http://localhost:9001/api/recipes/lookupAuthor/" + username, req).then((res) => res.json());
            }
            return fetchedRecipes;
        }
        catch (err) {
            console.log(err);
            return fetchedRecipes;
        }
    }

    async function getSavedRecipes() {
        const token = sessionStorage.getItem("token");
        let fetchedRecipes: any[] = [];
        try {
            if (token) {
                const req = {
                    method: "GET",
                    headers: {
                        'x-auth-token': token
                    }
                };
                const fetchedRecipeIds = await fetch("http://localhost:9001/api/users/savedRecipes/", req).then((res) => res.json());
                fetchedRecipeIds.forEach(async (id: string) => {
                    const recipe = await getRecipe(id);
                    fetchedRecipes.push(recipe);
                });
            }
            return fetchedRecipes;
        }
        catch (err) {
            console.log(err);
            return fetchedRecipes;
        }
    }

    async function getRecipe(recipeId: string) {
        const req = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const result = await fetch("http://localhost:9001/api/recipes/lookupId/" + recipeId, req).then((res) => res.json());
        return result;
    }

    function fillRecipes(recipes: any[]) {
        return (<Row xs="auto" md="auto" lg="auto">
            {recipes.map((recipe) => (
                <Col key={recipe._id}>
                    {RecipeCard(recipe)}
                </Col>
            ))}
        </Row>)
    }

    return (
        <><NavBar></NavBar>
            <div className='page'>
                <Tabs
                    activeKey={key}
                    id="collections"
                    onSelect={k => setKey(k ?? "MyRecipes")}>
                    <Tab eventKey="MyRecipes" title="My Recipes">
                        {fillRecipes(ownRecipes)}
                    </Tab>
                    <Tab eventKey="Favourites" title="Favourites">
                        {fillRecipes(savedRecipes)}
                    </Tab>
                </Tabs>
            </div></>
    )
}

export default Collections;
