import React from 'react';
import '../styles/search.css';
import NavBar from '../components/nav-bar/nav-bar';
import { useParams } from 'react-router-dom';
import RecipeCatalog from '../components/recipe-catalog/recipe-catalog';
import { Button } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import FilterMenu from '../components/filter-menu/filter-menu';

const Search = () => {
  const [recipes, setRecipes] = React.useState<any[]>([]);
  const [showFilterMenu, setShowFilterMenu] = React.useState(false);

  // Extract the 'query' parameter from the URL
  const { query } = useParams();

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

  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  const applyFilters = (data: Object) => {

    toggleFilterMenu();
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
        <FilterMenu showFilterMenu={showFilterMenu} handleClose={toggleFilterMenu} handleApply={applyFilters} titleQuery={query} />
        <p className="search-query">Search query: <i>{query}</i></p>
        <RecipeCatalog catalog={recipes}></RecipeCatalog>
      </div>
    </>
  );
};

export default Search;
