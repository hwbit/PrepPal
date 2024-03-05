import React from 'react';
import { Row, Col } from 'react-bootstrap';
import RecipeCard from '../components/recipe-card/recipe-card';
import '../styles/global.css';
import NavBar from '../components/nav-bar/nav-bar';
import { useParams } from 'react-router-dom';

const Search = () => {
  const [recipes, setRecipes] = React.useState<any[]>([]);

  // Extract the 'query' parameter from the URL
  const { query } = useParams();

  React.useEffect(() => {
    const fillRecipes = async () => {
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
    };

    fillRecipes();
  }, [query]);

  return (
    <><NavBar></NavBar>
      <div className="page">
        <h1>Search Results</h1>
        <p className="search-query">Search query: {query}</p>
        <Row xs="auto" md="auto" lg="auto">
          {recipes.map((recipe) => (
            <Col key={recipe._id}>
              {RecipeCard(recipe)}
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Search;
