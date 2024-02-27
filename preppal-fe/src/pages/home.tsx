// Import necessary React and TypeScript modules
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import RecipeCard from '../components/recipe-card/recipe-card';
import '../styles/global.css';
import NavBar from '../components/nav-bar/nav-bar';

const ExplorePage: React.FC = () => {
  const [recipes, setRecipes] = React.useState<any[]>([]);
  React.useEffect(() => {
    const fillRecipes = async () => {
      try {
        const req = {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const fetchedRecipes = await fetch("http://localhost:9001/api/recipes/", req).then((res) => res.json());
        setRecipes(fetchedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fillRecipes();
  }, []);

  return (
    <><NavBar></NavBar>
    <div className="explore-page">
      <h1>Explore</h1>
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

export default ExplorePage;
