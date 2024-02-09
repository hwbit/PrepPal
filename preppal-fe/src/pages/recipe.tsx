import { Container, Image, Stack, Card} from 'react-bootstrap';
const chickenfriedrice = require('../assets/chickenfriedrice.webp')

export default function Recipe() {
    return (
        <Container className="d-flex flex-column">
            <html>
                <h1>Chicken's Fried Rice</h1>
                <div>
                    <Image src={chickenfriedrice} width={200}/>
                </div>
                <div className="d-flex flex-row justify-content">
                    <div>Prep Time:</div>
                    <div>Cook Time:</div>
                    <div>Total Time:</div>
                    <div>Servings:</div>
                </div>
                <h1>Ingredients</h1>
                <li>Chicken</li>
                <li>Fried</li>
                <li>Rice</li>
                <h1>Directions</h1>
                <ol>
                    <li>Cook chicken</li>
                    <li>Fry rice</li>
                    <li>???</li>
                    <li>Profit</li>
                </ol>
                <h1>Nutrition Facts</h1>

                <h1>Reviews</h1>
                <Card></Card>
            </html>
        </Container>
    )
}