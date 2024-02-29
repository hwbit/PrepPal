import { Container, Image, Stack, Card } from 'react-bootstrap';
import { dateToString } from '../utils/date';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/nav-bar/nav-bar';
import '../styles/recipe.css';

const Recipe = () => {
    const location = useLocation();
    const { recipeInfo } = location.state;
    const ingredientsArray = (recipeInfo.ingredients).map((ingredient: string) => <li>{ingredient}</li>);
    const instructionsArray = (recipeInfo.instructions).map((step: string) => <li>{step}</li>);
    const datePublished = dateToString(new Date(recipeInfo.creationDate));
    return (
        <><NavBar></NavBar>
            <Container style={{ display: 'flex', justifyContent: 'center', margin: '40px' }}>
                <div
                    className='recipe'
                    style={{ maxWidth: '100%' }}>
                    <div
                        className='recipe-header'
                        style={{ display: 'flex', paddingBottom: '20px' }}>
                        <Image src={require('../assets/' + recipeInfo.image)} width={150} />
                        <div style={{ paddingLeft: '80px' }}>
                            <h1>{recipeInfo.title}</h1>
                            <div>{recipeInfo.description}</div>
                        </div>
                    </div>
                    <div className='recipe-info'>
                        <div className='recipe-info-row'>
                            <div className='author'> Author: {recipeInfo.author}</div>
                            <div className='date-published'>Date published: {datePublished}</div>
                        </div>
                        <div className='recipe-info-row'>
                            Serving Size: {recipeInfo.servingSize}
                        </div>
                        <Card className='recipe-info-row' style={{ flexDirection: 'row' }}>
                            <div className='recipe-info-attr'>
                                Prep Time:{recipeInfo.prepTime} min
                            </div>
                            <div className='recipe-info-attr'>
                                Cooking Time: {recipeInfo.cookingTime} min
                            </div>
                            <div className='recipe-info-attr'>
                                Total Time: {recipeInfo.prepTime + recipeInfo.cookingTime} min
                            </div>
                        </Card>
                    </div>
                    <div >
                        <h1 className='title-list'>Ingredients</h1>
                        <ul className='list'>
                            {ingredientsArray}
                        </ul>
                    </div>
                    <div>
                        <h1 className='title-list'>Instructions</h1>
                        <ol className='list'>
                            {instructionsArray}
                        </ol>
                    </div>
                </div>
            </Container ></>
    )
}

export default Recipe;