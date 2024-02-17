// Import necessary React and TypeScript modules
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
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
        {recipes.map((recipe) => (
          <Col key={recipe.recipeId}>
            {recipeCard(recipe)}
          </Col>
        ))}
      </Row>
    </div>
  );
};

function recipeCard(recipe:any) :JSX.Element {
  return (
    <Card className="recipe-card">
      <a href={`${recipe.author}/${recipe.titleUrl}`} target="_blank" rel="noopener noreferrer">
        <Card.Img className='recipe-img' variant='top' src={recipe.image} alt={recipe.title}/>
      </a>
      <Card.Body>
        <Card.Title className='recipe-title'>{recipe.title}</Card.Title>
        <Card.Text className='recipe-text'>{recipe.description}</Card.Text>
        <Card.Subtitle className='recipe-author'>{recipe.author}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default ExplorePage;
