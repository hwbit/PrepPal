import { Tabs, Tab } from 'react-bootstrap';
import React from 'react';
import NavBar from '../components/nav-bar/nav-bar';
import RecipeCatalog from '../components/recipe-catalog/recipe-catalog';

const Collections = () => {
    const [ownRecipes, setOwnRecipes] = React.useState<any[]>([]);
    const [savedRecipes, setSavedRecipes] = React.useState<any[]>([]);
    const [key, setKey] = React.useState("MyRecipes");

    React.useEffect(() => {
        getOwnRecipes().then(result => setOwnRecipes(result));
        getSavedRecipes().then(result => setSavedRecipes(result));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getOwnRecipes() {
        const token = sessionStorage.getItem("token");
        let fetchedRecipes: any[] = [];
        try {
            if (token && token !== "undefined") {
                const req = {
                    method: "GET",
                    headers: {
                        'x-auth-token': token
                    }
                };
                fetchedRecipes = await fetch("http://localhost:9001/api/users/ownRecipes/", req).then((res) => res.json());
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
            if (token && token !== "undefined") {
                const req = {
                    method: "GET",
                    headers: {
                        'x-auth-token': token
                    }
                };
                fetchedRecipes = await fetch("http://localhost:9001/api/users/savedRecipes/", req).then((res) => res.json());
            }
            return fetchedRecipes;
        }
        catch (err) {
            console.log(err);
            return fetchedRecipes;
        }
    }

    return (
        <><NavBar></NavBar>
            <div className='page'>
                <Tabs
                    activeKey={key}
                    id="collections"
                    onSelect={k => setKey(k ?? "MyRecipes")}>
                    <Tab eventKey="MyRecipes" title="My Recipes">
                        <RecipeCatalog catalog={ownRecipes}></RecipeCatalog>
                    </Tab>
                    <Tab eventKey="Favourites" title="Favourites">
                        <RecipeCatalog catalog={savedRecipes}></RecipeCatalog>
                    </Tab>
                </Tabs>
            </div></>
    )
}

export default Collections;
