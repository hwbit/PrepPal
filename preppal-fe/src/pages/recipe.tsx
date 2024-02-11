import { Container, Image, Stack, Row, Col, Card} from 'react-bootstrap';
import {FaStar, FaRegStar, FaHeart} from 'react-icons/fa';
const chickenfriedrice = require('../assets/chickenfriedrice.webp')

export default function Recipe() {
    return (
        <Container className="d-flex ">
        <html>
            <h1>Chicken's Fried Rice</h1>
            <Stack direction="horizontal">
                <div className="p-2">
                    {[...Array(4)].map(star => {
                        return <FaStar/>
                    })}
                    <FaRegStar/> 4.2
                </div>
                <div className="p-2">
                    43 Reviews
                </div>
                <div className="p-2">
                    10 Photos
                </div>
            </Stack>
            <div>No MSG required{"\n"}</div>
            <Stack direction="horizontal">
                <div className="p-2">
                    Author: _
                </div>
                <div className="p-2">
                    Date published: January 1, 2000
                </div>
            </Stack>
            <Stack direction="horizontal" gap={4}>
                <div>
                    <FaStar/> Rate
                </div>
                <div><FaHeart/> Favourite</div>
            </Stack>
            
            <div>
                <Image src={chickenfriedrice} width={200}/>
            </div>
            <Card>
                <Row className="">
                    <Col>Prep Time: 20 min</Col>
                    <Col>Cook Time: 20 min</Col>
                </Row>
                <Row>
                    <Col>Total Time: 40 min</Col>
                    <Col>Servings: 1</Col>
                </Row>
            </Card>
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
                <Stack direction="horizontal" gap={3}>
                    <div>Calories: __</div>
                    <div>Fat: __</div>
                    <div>Protein: __</div>
                    <div>Carbohydrates: __</div>
                </Stack>
                <h1>Reviews</h1>
                <Card>
                    <div>User 1</div>
                    <div>
                        {[...Array(4)].map(star => {
                            return <FaStar size={10}/>
                        })}
                        <FaRegStar size={10}/> 4.2
                    </div>
                    <div>no msg? this is a load of spicy chicken(trash)</div>
                </Card>
            </html>
        </Container>
    )
}