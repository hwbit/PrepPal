import React from 'react';
import '../styles/search.css';
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

const Search = () => {
  const [recipes, setRecipes] = React.useState<any[]>([]);
  const [showFilterMenu, setShowFilterMenu] = React.useState(false);

  // Extract the parameters from the URL
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
  }, [searchParams, setSearchParams]);

  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

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
      <div className="page">
        <div style={{ display: "inline-flex", alignItems: "center", marginBottom: "-15px"}}>
          <h1>Search</h1>
          <Button variant="outline-dark" className="filter-button" onClick={toggleFilterMenu}>
            Filter <FaFilter />
          </Button>
        </div>
        <FilterMenu showFilterMenu={showFilterMenu} handleClose={toggleFilterMenu} />
        {displayFilters()}
        <RecipeCatalog catalog={recipes}></RecipeCatalog>
      </div>
    </>
  );
};

export default Search;
