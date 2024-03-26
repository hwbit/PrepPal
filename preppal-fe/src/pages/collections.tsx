import { Tabs, Tab } from 'react-bootstrap';
import React from 'react';
import NavBar from '../components/nav-bar/nav-bar';
import { useSearchParams } from 'react-router-dom';
import RecipeCatalog from '../components/recipe-catalog/recipe-catalog';
import { Button } from 'react-bootstrap';
import { FaFilter, FaTimes } from 'react-icons/fa';
import FilterMenu from '../components/filter-menu/filter-menu';

const backendBaseURL = process.env.REACT_APP_BACKEND_BASE_URL;

interface RecipeQuery {
  [key: string]: string  | string[]| number | boolean | null | undefined;
  title?: string | null;
  author?: string | null;
  description?: string | null;
  ingredients?: string[] | null;
  cookingTime?: number | null;
  publicOnly?: boolean | null;
}

const Collections = () => {
    const [ownRecipes, setOwnRecipes] = React.useState<any[]>([]);
    const [savedRecipes, setSavedRecipes] = React.useState<any[]>([]);
    const [key, setKey] = React.useState("MyRecipes");
    const [showFilterMenu, setShowFilterMenu] = React.useState(false);

    // Extract the parameters from the URL
    const [searchParams, setSearchParams] = useSearchParams();
    const reqBody: RecipeQuery = { publicOnly: false };

    React.useEffect(() => {
        if (searchParams.has("title")) reqBody.title = searchParams.get("title");
        if (searchParams.has("author")) reqBody.author = searchParams.get("author");
        if (searchParams.has("description")) reqBody.description = searchParams.get("description");
        if (searchParams.has("ingredients")) {
            const ingredientArr = searchParams.get("ingredients")?.split(/\s*,\s*/);
            reqBody.ingredients = ingredientArr;
        }
        if (searchParams.has("cookingTime")) {
            const cookingTimeStr = searchParams.get("cookingTime");
            const cookingTime = parseInt(cookingTimeStr ? cookingTimeStr : "");
            if (cookingTime > 0) reqBody.cookingTime = cookingTime;
        }
        getOwnRecipes().then(result => setOwnRecipes(result));
        getSavedRecipes().then(result => setSavedRecipes(result));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const toggleFilterMenu = () => {
        setShowFilterMenu(!showFilterMenu);
    };

    async function getOwnRecipes() {
        const token = sessionStorage.getItem("token");
        let fetchedRecipes: any[] = [];
        try {
            if (token && token !== "undefined") {
                const req = {
                    method: "GET",
                    headers: {
                        'x-auth-token': token
                    },
                    body: JSON.stringify(reqBody)
                };
                fetchedRecipes = await fetch(backendBaseURL+"/api/users/ownRecipes/", req).then((res) => res.json());
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
                    },
                    body: JSON.stringify(reqBody)
                };
                fetchedRecipes = await fetch(backendBaseURL+"/api/users/savedRecipes/", req).then((res) => res.json());
            }
            return fetchedRecipes;
        }
        catch (err) {
            console.log(err);
            return fetchedRecipes;
        }
    }

    const displayFilters = () => {
    return (
        <div id="query-display" className="search-query">
        {searchParams.size > 0 ? "Search query:" : ""}
        {Array.from(searchParams.keys()).map((key, index) => {
            const value = searchParams.get(key);

            const handleRemoveFilter = () => {
            if (searchParams.has(key)) {
                searchParams.delete(key);
                setSearchParams(searchParams);
            }
            };

            return (
            <button key={index} className="filter-clear-button" onClick={handleRemoveFilter}>
                <strong>{convertCamelCase(key)}:</strong> <i>{value}</i>  <FaTimes />
            </button>
            );
        })}
        </div>
    );
    };

    const convertCamelCase = (camelCaseString: string) => {
        let result = camelCaseString.replace(/([A-Z])/g, " $1");
        result = result.charAt(0).toUpperCase() + result.slice(1);
        return result;
    }


    return (
        <><NavBar></NavBar>
            <div className='page'>
                <Button variant="outline-dark" className="filter-button" onClick={toggleFilterMenu}>
                    Filter <FaFilter />
                </Button>
                <FilterMenu showFilterMenu={showFilterMenu} handleClose={toggleFilterMenu} />
                {displayFilters()}
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
