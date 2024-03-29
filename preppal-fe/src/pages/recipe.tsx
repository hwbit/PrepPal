import React from "react";
import { Container, Image as ReactImage, Card, Form, Row, Col, Button } from "react-bootstrap";
import { dateToString } from "../utils/date";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/nav-bar/nav-bar";
import Review from "../components/review/review";
import "../styles/recipe.css";
import FavouriteButton from "../components/fav-button/fav-button";

const backendBaseURL = process.env.REACT_APP_BACKEND_BASE_URL;

const Recipe = () => {
    const { recipeId } = useParams();

    // for recipes
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

    // for reviews
    const [username, setUsername] = React.useState("");
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [reviews, setReviews] = React.useState<any[]>([]);
    const [review, setNewReview] = React.useState({
        title: "",
        comment: "",
    });
    const [rating, setRating] = React.useState(0);
    const [isComplete, setIsComplete] = React.useState(false);
    const ratings = [
        // eslint-disable-next-line no-magic-numbers
        1, 2, 3, 4, 5,
    ];

    const [recipeRatings, setRecipeRatings] = React.useState(0);
    const [recipeRatingTally, setRecipeRatingTally] = React.useState(0);

    const [myRecipe, setMyRecipe] = React.useState(true);

    React.useEffect(() => {
        getUser();
        getRecipe();
         // eslint-disable-next-line
    },[username])

    React.useEffect(() => {
      getReviews();
      renderStars();
      // eslint-disable-next-line
    }, [recipeRatings, recipeRatingTally]);

    const getUser = async () => {
        const token = sessionStorage.getItem("token");
        try {
            if (token && token !== "undefined") {
                const req = {
                    method: "GET",
                    headers: {"x-auth-token": token},
                };
                const res = await fetch(`${backendBaseURL}/api/auth/`, req).then((response) => response.json());
                setUsername(res.username);
                setLoggedIn(true);
            }
        }
        catch (err) {
            console.error(err);
        }
    };

    const getRecipe = async () => {
        try {
            const req = {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            };
            const res = await fetch(`${backendBaseURL}/api/recipes/lookupId/${recipeId}`, req).then((response) => response.json());
            setAuthor(res.author);
            setDate(dateToString(new Date(res.creationDate)));
            setTitle(res.title);
            setDescription(res.description);
            setImage(res.image);
            setIngredients(res.ingredients.map((ingredient: string, i: number) => <li key={i}>{ingredient}</li>));
            setInstructions(res.instructions.map((step: string, i: number) => <li key={i}>{step}</li>));
            setServingSize(res.servingSize);
            setPrepTime(res.prepTime);
            setCookTime(res.cookingTime);
            setMyRecipe(res.author === username);
        }
        catch (err) {
            console.error(err);
        }
    };

    const getReviews = async () => {
        try {
            const req = {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            };
            const res = await fetch(`${backendBaseURL}/api/reviews/${recipeId}`, req).then((response) => response.json());
            if (res) {
                setReviews(res.reviews);
                calculateRecipeRating(res.reviews);
            }
        }
        catch (err) {
            console.error(err);
        }
    };

    const calculateRecipeRating = (recipeReviews: any) => {
        let tally = 0;
        let count = 0;

        for (const recipeReview of recipeReviews) {
            tally += recipeReview.rating;
            count++;
        }
        setRecipeRatingTally(count);
        // prevent divide by zero
        setRecipeRatings(count === 0 ? 0 : tally / count);
    };


    const renderStars = () => {
        const stars = [];
        // Logic to render stars based on rating
        // eslint-disable-next-line no-magic-numbers
        for (let i = 1; i <= 5; i++) {
            if (i <= recipeRatings) {
                stars.push(
                  <span
                    key={i}
                    className={"star filled"}
                  >
                    &#9733;
                  </span>,
                );
            }
            else {
                stars.push(
                  <span
                    key={i}
                    className={"star"}
                  >
                    &#9733;
                  </span>,
                );
            }
        }
        return stars;
    };


    const handleChange = (e: any) => {
        setNewReview({ ...review, [e.target.name]: e.target.value });
        checkCompletion(review.title, rating);
    };

    const handleStarClick = (value: any) => {
        setRating(value);
        checkCompletion(review.title, value);
    };

    const checkCompletion = (title: any, recipeRating: any) => {
        if (title.trim() !== "" && recipeRating > 0) {
            setIsComplete(true);
        }
        else {
            setIsComplete(false);
        }
    };

    const handleNewReview = async () => {
        try {
            const req = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    recipeId: recipeId,
                    author: username,
                    rating: rating,
                    title: review.title,
                    comment: review.comment,
                }),
            };
            await fetch(`${backendBaseURL}/api/reviews/post`, req).then((response) => response.json());
        }
        catch (err) {
            console.error(err);
        }
    };

    function renderFavButton() {
      if (loggedIn && !myRecipe) {
        return <FavouriteButton id={recipeId}></FavouriteButton>
      }
    }

    return (
      <>
        <NavBar></NavBar>
        <Container>
          <div
            className={"form"}
            style={{ width: "700px" }}
          >
            <div className={"recipe-header"}>
              <ReactImage
                src={require(`../assets/${recipeImage}`)}
                width={150}
                height={120}
              />
              <div style={{ paddingLeft: "100px" }}>
                <h1 className={"recipe-header-row"}>{recipeTitle}</h1>
                <div
                  className={"recipe-header-row"}
                  style={{ paddingLeft: "20px" }}
                >
                  {renderStars()}
                  {" "}
                  {recipeRatings.toFixed(2)}
                  {" "}
                  (
                  {recipeRatingTally}
                  )
                </div>
                <div
                  className={"recipe-header-row"}
                  style={{ paddingLeft: "20px" }}
                >
                  {recipeDescription}
                </div>
              </div>
              <div className={"recipe-icons"}>
                {renderFavButton()}
              </div>
            </div>
            <div className={"recipe-info"}>
              <div className={"recipe-info-row"}>
                <div className={"author"}>
                  {" "}
                  Author:
                  <Link to={`/profile/${recipeAuthor}`}>{recipeAuthor}</Link>
                </div>
                <div className={"date-published"}>
                  Date published:
                  {recipeDate}
                </div>
              </div>
              <div className={"recipe-info-row"}>
                Serving Size:
                {" "}
                {recipeServingSize}
              </div>
              <Card
                className={"recipe-info-row"}
                style={{ flexDirection: "row" }}
              >
                <div className={"recipe-info-attr"}>
                  Prep Time:
                  {" "}
                  {recipePrepTime}
                  {" "}
                  min
                </div>
                <div className={"recipe-info-attr"}>
                  Cooking Time:
                  {" "}
                  {recipeCookTime}
                  {" "}
                  min
                </div>
                <div className={"recipe-info-attr"}>
                  Total Time:
                  {" "}
                  {recipePrepTime + recipeCookTime}
                  {" "}
                  min
                </div>
              </Card>
            </div>
            <div className={"list"}>
              <h1 className={"title-list"}>Ingredients</h1>
              <ul className={"items"}>
                {recipeIngredients}
              </ul>
            </div>
            <div className={"list"}>
              <h1 className={"title-list"}>Instructions</h1>
              <ol className={"items"}>
                {recipeInstructions}
              </ol>
            </div>

            <hr className={"divider"} />

            <h1 className={"title-leave-comment"}>Leave a review</h1>
            {!loggedIn ? <Card>Must be logged in to leave a review</Card>
            // review form
                : (
                  <Form onSubmit={handleNewReview}>
                    <Form.Group
                      controlId={"title"}
                      style={{ paddingBottom: "24px" }}
                      title={"Review Title"}
                    >
                      <Form.Label>Review Title (Required)</Form.Label>
                      <Form.Control
                        required={true}
                        name={"title"}
                        type={"text"}
                        onChange={(ev) => handleChange(ev)}
                      />
                      <Form.Control.Feedback type={"invalid"}>Please enter a title</Form.Control.Feedback>
                    </Form.Group>
                    <div
                      className={"star-rating"}
                      title={"Rating"}
                    >
                      Rating (Required):
                      {" "}
                      {ratings.map((star) => (
                        <span
                          key={star}
                          className={star <= rating ? "star filled" : "star"}
                          onClick={() => handleStarClick(star)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <Form.Group
                      controlId={"comment"}
                      style={{ paddingBottom: "24px" }}
                      title={"Comment"}
                    >
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        type={"text"}
                        as={"textarea"}
                        rows={3}
                        name={"comment"}
                        onChange={(ev) => handleChange(ev)}
                      />
                    </Form.Group>
                    <Button
                      variant={"primary"}
                      type={"submit"}
                      title={"Submit"}
                      size={"lg"}
                      disabled={!isComplete}
                    >
                      Submit
                    </Button>

                  </Form>
                )
            }
            <h1 className={"title-view-list"}>Reviews</h1>
            <Row
              xs={"auto"}
              md={"auto"}
              lg={"auto"}
            >
              {reviews.map((theReview, i) => (
                <Col key={i}>
                  {Review(theReview)}
                </Col>
              ))}
            </Row>

          </div>
        </Container>
      </>
    );
};

export default Recipe;
