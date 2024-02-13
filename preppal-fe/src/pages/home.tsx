// Import necessary React and TypeScript modules
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import '../styles/global.css';

// Define a type for recipe data
type Recipe = {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  link: string;
};

// Placeholder recipe data
const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Grilled Cheese Sandwich',
    imageUrl: 'https://images.media-allrecipes.com/userphotos/2206436.jpg',
    description: 'Learn how to make a grilled cheese sandwich in a nonstick pan with buttered bread and American Cheddar for a classic hot sandwich.',
    link: 'https://www.allrecipes.com/recipe/23891/grilled-cheese-sandwich/',
  },
  {
    id: 2,
    title: 'Simple Macaroni and Cheese',
    imageUrl: 'https://www.the-girl-who-ate-everything.com/wp-content/uploads/2021/07/stovetop-mac-n-cheese-10.jpg',
    description: 'Quick, easy, and tasty macaroni and cheese dish. Fancy, designer mac and cheese often costs forty or fifty dollars to prepare when you have so many expensive cheeses, but they aren\'t always the best tasting. This simple recipe is cheap and tasty.',
    link: 'https://www.allrecipes.com/recipe/238691/simple-macaroni-and-cheese/',
  },
  {
    id: 3,
    title: 'Grilled Cheese Sandwich',
    imageUrl: 'https://images.media-allrecipes.com/userphotos/2206436.jpg',
    description: 'Learn how to make a grilled cheese sandwich in a nonstick pan with buttered bread and American Cheddar for a classic hot sandwich.',
    link: 'https://www.allrecipes.com/recipe/23891/grilled-cheese-sandwich/',
  },
  {
    id: 4,
    title: 'Simple Macaroni and Cheese',
    imageUrl: 'https://www.the-girl-who-ate-everything.com/wp-content/uploads/2021/07/stovetop-mac-n-cheese-10.jpg',
    description: 'Quick, easy, and tasty macaroni and cheese dish. Fancy, designer mac and cheese often costs forty or fifty dollars to prepare when you have so many expensive cheeses, but they aren\'t always the best tasting. This simple recipe is cheap and tasty.',
    link: 'https://www.allrecipes.com/recipe/238691/simple-macaroni-and-cheese/',
  },
  {
    id: 5,
    title: 'Grilled Cheese Sandwich',
    imageUrl: 'https://images.media-allrecipes.com/userphotos/2206436.jpg',
    description: 'Learn how to make a grilled cheese sandwich in a nonstick pan with buttered bread and American Cheddar for a classic hot sandwich.',
    link: 'https://www.allrecipes.com/recipe/23891/grilled-cheese-sandwich/',
  },
  {
    id: 6,
    title: 'Simple Macaroni and Cheese',
    imageUrl: 'https://www.the-girl-who-ate-everything.com/wp-content/uploads/2021/07/stovetop-mac-n-cheese-10.jpg',
    description: 'Quick, easy, and tasty macaroni and cheese dish. Fancy, designer mac and cheese often costs forty or fifty dollars to prepare when you have so many expensive cheeses, but they aren\'t always the best tasting. This simple recipe is cheap and tasty.',
    link: 'https://www.allrecipes.com/recipe/238691/simple-macaroni-and-cheese/',
  },
  {
    id: 7,
    title: 'Grilled Cheese Sandwich',
    imageUrl: 'https://images.media-allrecipes.com/userphotos/2206436.jpg',
    description: 'Learn how to make a grilled cheese sandwich in a nonstick pan with buttered bread and American Cheddar for a classic hot sandwich.',
    link: 'https://www.allrecipes.com/recipe/23891/grilled-cheese-sandwich/',
  },
  {
    id: 8,
    title: 'Simple Macaroni and Cheese',
    imageUrl: 'https://www.the-girl-who-ate-everything.com/wp-content/uploads/2021/07/stovetop-mac-n-cheese-10.jpg',
    description: 'Quick, easy, and tasty macaroni and cheese dish. Fancy, designer mac and cheese often costs forty or fifty dollars to prepare when you have so many expensive cheeses, but they aren\'t always the best tasting. This simple recipe is cheap and tasty.',
    link: 'https://www.allrecipes.com/recipe/238691/simple-macaroni-and-cheese/',
  },
];

const ExplorePage: React.FC = () => {
  return (
    <div className="explore-page">
      <h1 style={{margin:'20px'}}>Explore</h1>
      <Row xs="auto" md="auto" lg="auto">
        {recipes.map((recipe) => (
          <Col key={recipe.id}>
            <Card className="recipe-card">
              <a href={recipe.link} target="_blank" rel="noopener noreferrer">
                <Card.Img className='recipe-img' variant='top' src={recipe.imageUrl} alt={recipe.title}/>
              </a>
              <Card.Body>
                <Card.Title className='recipe-title'>{recipe.title}</Card.Title>
                <Card.Text className='recipe-text'>{recipe.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ExplorePage;
