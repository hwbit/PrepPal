// Import necessary React and TypeScript modules
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import recipeCard from '../components/RecipeCard/RecipeCard';
import '../styles/global.css';


const ExplorePage: React.FC = () => {
  const [recipes, setRecipes] = React.useState<any[]>([]);
  React.useEffect(() => {
    fillRecipes();
  }, []);

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

  return (
    <div className="explore-page">
      <h1 style={{margin:'20px'}}>Explore</h1>
      <Row xs="auto" md="auto" lg="auto">
        {recipes.filter(recipe => recipe.isPublic).map((recipe) => (
          <Col key={recipe._id}>
            {recipeCard(recipe)}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ExplorePage;
