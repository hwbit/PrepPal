import { Container, Image, Stack, Row, Col, Card} from 'react-bootstrap';
import { dateToString } from '../utils/date';

const recipeInfo: any = {
    author: "John Doe",
    title: "Chicken's Fried Rice",
    description: "A chicken fried this rice.",
    image: "logo.png",
    ingredients: ["Rice","Chicken","Green onion"],
    instructions: ["Cook chicken","Fry rice"],
    servingSize: 1,
    prepTime: 20,
    cookingTime: 30,
    modifiedDate: new Date()
}

const Recipe = () => {
    const ingredientsArray = (recipeInfo.ingredients).map((ingredient: string) => <li>{ingredient}</li>);
    const instructionsArray = (recipeInfo.instructions).map((step: string) => <li>{step}</li>)
    const datePublished = dateToString(recipeInfo.modifiedDate);
    return (
        <Container className="d-flex ">
        <html>
            <h1>{recipeInfo.title}</h1>
            <div>{recipeInfo.description}</div>
            <Stack direction="horizontal">
                <div className="p-2">
                    Author: {recipeInfo.author}
                </div>
                <div className="p-2">
                    Date published: {datePublished}
                </div>
            </Stack>
            <div>
                <Image src={require("../assets/"+recipeInfo.image)} width={200}/>
            </div>
            <Card>
                <Row className="">
                    <Col>Prep Time: {recipeInfo.prepTime} min</Col>
                    <Col>Cooking Time: {recipeInfo.cookingTime} min</Col>
                </Row>
                <Row>
                    <Col>Total Time: {recipeInfo.prepTime+recipeInfo.cookingTime} min</Col>
                    <Col>Serving Size: {recipeInfo.servingSize}</Col>
                </Row>
            </Card>
                <h1>Ingredients</h1>
                <ul>
                    {ingredientsArray}
                </ul>
                <h1>Instructions</h1>
                <ol>
                    {instructionsArray}
                </ol>
            </html>
        </Container>
    )
}

export default Recipe;