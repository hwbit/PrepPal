import { Container, Image, Stack, Card} from 'react-bootstrap';
import { dateToString } from '../utils/date';
import { useLocation } from 'react-router-dom';

const Recipe = () => {
    const location = useLocation();
    const { recipeInfo } = location.state;
    const ingredientsArray = (recipeInfo.ingredients).map((ingredient: string) => <li>{ingredient}</li>);
    const instructionsArray = (recipeInfo.instructions).map((step: string) => <li>{step}</li>);
    const datePublished = dateToString(new Date(recipeInfo.creationDate));
    return (
        <Container style={{ display: 'flex', justifyContent: 'center', width: '66%' }}>
            <div>
                <Stack direction='horizontal' className='ms-auto'>
                    <div>
                        <Image src={require("../assets/"+recipeInfo.image)} width={150}/>
                    </div>
                    <div>
                        <h1>{recipeInfo.title}</h1>
                        <div>{recipeInfo.description}</div>
                    </div>
                </Stack>
                <Stack direction="horizontal">
                    <div>
                        Author: {recipeInfo.author}
                    </div>
                    <div className="ms-auto">
                        Date published: {datePublished}
                    </div>
                </Stack>
                <div>Serving Size: {recipeInfo.servingSize}</div>
                <Card style={{}}>
                    <Stack direction='horizontal'>
                        <div className='me-auto'>
                            <Card.Subtitle>Prep Time:</Card.Subtitle>
                            {recipeInfo.prepTime} min
                        </div>
                        <div className='me-auto'>
                            <Card.Subtitle>Cooking Time:</Card.Subtitle>
                            {recipeInfo.cookingTime} min
                        </div>
                        <div>
                            <Card.Subtitle>Total Time:</Card.Subtitle>
                            {recipeInfo.prepTime+recipeInfo.cookingTime} min
                        </div>
                    </Stack>
                </Card>
                <h1>Ingredients</h1>
                <ul>
                    {ingredientsArray}
                </ul>
                <h1>Instructions</h1>
                <ol>
                    {instructionsArray}
                </ol>
            </div>
        </Container>
    )
}

export default Recipe;