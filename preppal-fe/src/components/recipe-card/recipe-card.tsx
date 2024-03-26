import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/global.css";
import "./recipe-card.css";

function RecipeCard(recipe: any): JSX.Element {
    const recipeImage = require(`../../assets/${recipe.image}`);
    return (
      <Card className={"recipe-card"}>
        <Link
          to={`/recipe/${recipe._id}`}
          title={"recipe-link"}
        >
          <Card.Img
            className={"recipe-img"}
            variant={"top"}
            src={recipeImage}
            alt={recipe.title}
            title={"recipe-img"}
          />
        </Link>
        <Card.Body>
          <Card.Title className={"recipe-title"}>{recipe.title}</Card.Title>
          <Card.Text className={"recipe-text"}>{recipe.description}</Card.Text>
          <Card.Subtitle className={"recipe-author"}>{recipe.author}</Card.Subtitle>
        </Card.Body>
      </Card>
    );
}

export default RecipeCard;
