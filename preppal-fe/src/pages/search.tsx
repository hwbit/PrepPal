import React from 'react';
import '../styles/search.css';
import NavBar from '../components/nav-bar/nav-bar';
import { useSearchParams } from 'react-router-dom';
import RecipeCatalog from '../components/recipe-catalog/recipe-catalog';
import { Button } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import FilterMenu from '../components/filter-menu/filter-menu';

interface RecipeQuery {
  title?: string | null;
  author?: string | null;
  description?: string | null;
  ingredients?: string[] | null;
  cookingTime?: number | null;
  publicOnly: boolean | null;
}

const backendBaseURL = process.env.REACT_APP_BACKEND_BASE_URL;

const Search = () => {
  const [recipes, setRecipes] = React.useState<any[]>([]);
  const [showFilterMenu, setShowFilterMenu] = React.useState(false);

  // Extract the parameters from the URL
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    const reqBody: RecipeQuery = { publicOnly: true };
    if (searchParams.has("title")) reqBody.title = searchParams.get("title");
    if (searchParams.has("author")) reqBody.author = searchParams.get("author");
    if (searchParams.has("description")) reqBody.description = searchParams.get("description");
    if (searchParams.has("ingredients")) {
      const ingredientArr = searchParams.get("ingredients")?.split(/\s?,\s?/);
      reqBody.ingredients = ingredientArr;
    }
    if (searchParams.has("cookingTime")) {
      const cookingTimeStr = searchParams.get("cookingTime");
      const cookingTime = parseInt(cookingTimeStr ? cookingTimeStr : "");
      if (cookingTime > 0) reqBody.cookingTime = cookingTime;
    }

    const fillRecipes = async () => {
      if (Object.entries(reqBody).length > 0) {
        try {
          const req = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
          };

          const fetchedRecipes = await fetch(backendBaseURL+"/api/recipes/searchRecipes/", req).then((res) => res.json());

          setRecipes(fetchedRecipes);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fillRecipes();
  }, [searchParams]);

  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  return (
    <><NavBar></NavBar>
      <div className="page">
        <div style={{ display: "inline-flex", alignItems: "center", marginBottom: "-15px"}}>
          <h1>Search Results</h1>
          <Button variant="outline-dark" className="filter-button" onClick={toggleFilterMenu}>
            Filter <FaFilter />
          </Button>
        </div>
        <FilterMenu showFilterMenu={showFilterMenu} handleClose={toggleFilterMenu} />
        <p className="search-query">Search query: <i>{searchParams.get("title")}</i></p>
        <RecipeCatalog catalog={recipes}></RecipeCatalog>
      </div>
    </>
  );
};

export default Search;
