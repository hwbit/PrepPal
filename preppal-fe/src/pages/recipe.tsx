import React from 'react';
import { Container, Image, Card, Form, Row, Col, Button } from 'react-bootstrap';
import { dateToString } from '../utils/date';
import { useParams } from 'react-router-dom';
import NavBar from '../components/nav-bar/nav-bar';
import Review from '../components/review/review';
import '../styles/recipe.css';

const Recipe = () => {
    const [error, setError] = React.useState('');

    const { recipeId } = useParams();
    const [username, setUsername] = React.useState("");
    const [recipeAuthor, setAuthor] = React.useState("");
    const [recipeDate, setDate] = React.useState("");
    const [recipeTitle, setTitle] = React.useState("");
    const [recipeDescription, setDescription] = React.useState("");
    const [recipeImage, setImage] = React.useState("logo.png");
    const [recipeIngredients, setIngredients] = React.useState("");
    const [recipeInstructions, setInstructions] = React.useState("");
    const [recipeServingSize, setServingSize] = React.useState("");
    const [recipePrepTime, setPrepTime] = React.useState("");
    const [recipeCookTime, setCookTime] = React.useState("");
    const [reviews, setReviews] = React.useState<any[]>([]);

    const [review, setNewReview] = React.useState({
        'title': "",
        'comment': "",
    });

    const [rating, setRating] = React.useState(0);
    const ratings = [1, 2, 3, 4, 5];

    React.useEffect(() => {
        getUser();
        getRecipe();
        getReviews();
        // eslint-disable-next-line
    }, []);

    const getUser = async () => {
        const token = sessionStorage.getItem("token");
        try {
            if (token) {
                const req = {
                    method: "GET",
                    headers: {
                        "x-auth-token": token
                    }
                };
                const res = await fetch("http://localhost:9001/api/auth/", req).then(res => res.json());
                setUsername(res.username);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const getRecipe = async () => {
        try {
            const req = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await fetch(`http://localhost:9001/api/recipes/lookupId/${recipeId}`, req).then(res => res.json());
            setAuthor(res.author);
            setDate(dateToString(new Date(res.creationDate)));
            setTitle(res.title);
            setDescription(res.description);
            setImage(res.image);
            setIngredients(res.ingredients.map((ingredient: string) => <li>{ingredient}</li>));
            setInstructions(res.instructions.map((step: string) => <li>{step}</li>));
            setServingSize(res.servingSize);
            setPrepTime(res.prepTime);
            setCookTime(res.cookingTime);
        } catch (err) {
            console.error(err);
        }
    };

    const getReviews = async () => {
        try {
            const req = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await fetch(`http://localhost:9001/api/reviews/${recipeId}`, req).then((res) => res.json());
            setReviews(res.reviews);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e: any) => {
        setNewReview({ ...review, [e.target.name]: e.target.value });
    };

    const handleStarClick = (value: any) => {
        setRating(value);
        setError('');
    };

    const handleNewReview = async () => {
        try {
            if (rating === 0) {
                setError('Please select a rating.');
            } else {
                const req = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'recipeId': recipeId,
                        'author': username,
                        'rating': rating,
                        'title': review.title,
                        'comment': review.comment,
                    })
                };
                await fetch("http://localhost:9001/api/reviews/post", req).then(res => res.json());
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <><NavBar></NavBar>
            <Container>
                <div className='form' style={{ width: '700px' }}>
                    <div className='recipe-header'>
                        <Image src={require('../assets/' + recipeImage)} width={150} height={120} />
                        <div style={{ paddingLeft: '100px' }}>
                            <h1 className='recipe-header-row'>{recipeTitle}</h1>
                            <div className='recipe-header-row' style={{ paddingLeft: '20px' }}>{recipeDescription}</div>
                        </div>
                    </div>
                    <div className='recipe-info'>
                        <div className='recipe-info-row'>
                            <div className='author'> Author: {recipeAuthor}</div>
                            <div className='date-published'>Date published: {recipeDate}</div>
                        </div>
                        <div className='recipe-info-row'>
                            Serving Size: {recipeServingSize}
                        </div>
                        <Card className='recipe-info-row' style={{ flexDirection: 'row' }}>
                            <div className='recipe-info-attr'>
                                Prep Time: {recipePrepTime} min
                            </div>
                            <div className='recipe-info-attr'>
                                Cooking Time: {recipeCookTime} min
                            </div>
                            <div className='recipe-info-attr'>
                                Total Time: {recipePrepTime + recipeCookTime} min
                            </div>
                        </Card>
                    </div>
                    <div className='list'>
                        <h1 className='title-list'>Ingredients</h1>
                        <ul className='items'>
                            {recipeIngredients}
                        </ul>
                    </div>
                    <div className='list'>
                        <h1 className='title-list'>Instructions</h1>
                        <ol className='items'>
                            {recipeInstructions}
                        </ol>
                    </div>

                    <hr className="divider" />

                    <h1 className='title-leave-comment'>Leave a review</h1>
                    <Form onSubmit={handleNewReview}>
                        <Form.Group controlId="review-title" style={{ paddingBottom: '24px' }} title="Review Title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                required
                                name='review-title'
                                type='text'
                                onChange={(event) => handleChange(event)} />
                            <Form.Control.Feedback type="invalid">Please enter a title</Form.Control.Feedback>
                        </Form.Group>
                        <div className="star-rating" title="Rating">
                            Rating: {ratings.map((star) => (
                                <span
                                    key={star}
                                    className={star <= rating ? 'star filled' : 'star'}
                                    onClick={() => handleStarClick(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <Form.Group controlId='review-comment' style={{ paddingBottom: '24px' }} title="Comment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                type='text' as='textarea'
                                rows={3}
                                name='review-comment'
                                onChange={(event) => handleChange(event)} />
                        </Form.Group>
                        {error && <p className="error">{error}</p>}
                        <Button
                            variant='primary'
                            type='submit'
                            title='Submit'
                            size='lg'
                        >
                            Submit
                        </Button>
                    </Form>

                    <h1 className='title-view-list'>Reviews</h1>
                    <Row xs="auto" md="auto" lg="auto">
                        {reviews.map((review) => (
                            <Col key={review.author}>
                                {Review(review)}
                            </Col>
                        ))}
                    </Row>

                </div>
            </Container ></>
    )
}

export default Recipe;