import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import RecipeCard from '../components/recipe-card/recipe-card';
import '../styles/global.css';
import NavBar from '../components/nav-bar/nav-bar';

const Search: React.FC = () => {
  const [recipes, setRecipes] = React.useState<any[]>([]);
  // Extract the 'q' parameter from the URL
  const { q } = useParams();

  React.useEffect(() => {
    const fillRecipes = async () => {
      try {
        const req = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: q
          })
        };
        const fetchedRecipes = await fetch("http://localhost:9001/api/recipes/searchName/", req).then((res) => res.json());
        setRecipes(fetchedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fillRecipes();
  }, [q]);

  return (
    <><NavBar></NavBar>
    <div className="search-page">
      <h1>Search Results</h1>
      <p className="search-query">Search query: {q}</p>
      <Row xs="auto" md="auto" lg="auto">
        {recipes.filter(recipe => recipe.isPublic).map((recipe) => (
          <Col key={recipe._id}>
            {RecipeCard(recipe)}
          </Col>
        ))}
      </Row>
    </div></>
  );
};

export default Search;
