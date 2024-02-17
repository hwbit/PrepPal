import { Card } from "react-bootstrap";
import '../../styles/global.css';
import './RecipeCard.css';

function RecipeCard(recipe:any):JSX.Element {
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

export default RecipeCard;