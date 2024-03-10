import React from 'react';
import '../styles/global.css';
import NavBar from '../components/nav-bar/nav-bar';
import { useParams } from 'react-router-dom';
import RecipeCatalog from '../components/recipe-catalog/recipe-catalog';

const Search = () => {
  const [recipes, setRecipes] = React.useState<any[]>([]);
  const [showFilterMenu, setShowFilterMenu] = React.useState(false);

  // Extract the 'query' parameter from the URL
  const { query } = useParams();

  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  React.useEffect(() => {
    const fillRecipes = async () => {
      if (query) {
        try {
          const req = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: query
            })
          };
          let fetchedRecipes = await fetch("http://localhost:9001/api/recipes/searchName/", req).then((res) => res.json());
          setRecipes(fetchedRecipes);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fillRecipes();
  }, [query]);

  return (
    <><NavBar></NavBar>
      <div className="page">
        <h1>Search Results</h1>
        <p className="search-query">Search query: {query}</p>
        <RecipeCatalog catalog={recipes}></RecipeCatalog>
      </div>
    </>
  );
};

export default Search;
