import React from 'react';
import '../styles/search.css';
import NavBar from '../components/nav-bar/nav-bar';
import { useSearchParams } from 'react-router-dom';
import RecipeCatalog from '../components/recipe-catalog/recipe-catalog';
import { Button } from 'react-bootstrap';
import { FaFilter, FaTimes } from 'react-icons/fa';
import FilterMenu from '../components/filter-menu/filter-menu';

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
          const fetchedRecipes = await fetch("http://localhost:9001/api/recipes/searchRecipes", req).then((res) => res.json());
          setRecipes(fetchedRecipes);
        } catch (err) {
          console.error(err);
        }
      }
    };

    const displayFilters = () => {
      const queryDisplay = document.getElementById("query-display");
      if (queryDisplay) {
        queryDisplay.innerText = "Search query:";
        for (const key of searchParams.keys()) {
          const value = searchParams.get(key);

          const displayItem = document.createElement("button");
          displayItem.innerHTML = (<div>
            <strong>{convertCamelCase(key)}</strong>: <i>{value}</i>  <FaTimes />
          </div>);//`<strong>${convertCamelCase(key)}</strong>:&nbsp;<i>${value}</i>&nbsp;&nbsp;X`;
          displayItem.className = "display-item";
          displayItem.addEventListener("click", (ev) => {
            if (searchParams.has(key)) {
              searchParams.delete(key);
              setSearchParams(searchParams);
            }
          });
          queryDisplay.appendChild(displayItem);
        }
      }
    };

    fillRecipes();
    displayFilters();
  }, [searchParams, setSearchParams]);

  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
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
          <h1>Search Results</h1>
          <Button variant="outline-dark" className="filter-button" onClick={toggleFilterMenu}>
            Filter <FaFilter />
          </Button>
        </div>
        <FilterMenu showFilterMenu={showFilterMenu} handleClose={toggleFilterMenu} />
        <p id="query-display" className="search-query"></p>
        <RecipeCatalog catalog={recipes}></RecipeCatalog>
      </div>
    </>
  );
};

export default Search;
