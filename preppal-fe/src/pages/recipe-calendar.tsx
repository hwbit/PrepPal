import Calendar from "react-calendar";
import NavBar from "../components/nav-bar/nav-bar";
import { Button, Card, Col, Row, Stack } from "react-bootstrap";
import React from "react";
import RecipeCard from "../components/recipe-card/recipe-card";

const backendBaseURL = process.env.REACT_APP_BACKEND_BASE_URL;

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function RecipeCalendar() {
    const [currDate, onChange] = React.useState<Value>(new Date());
    const [username, setName] = React.useState("");
    const [recipes, setRecipes] = React.useState<any[]>([]);
    const [calendarObject, setCalendarObject] = React.useState<any>();
    const [recipeID, setRecipeID] = React.useState("");
    const [recipeTitle, setRecipeTitle] = React.useState("");
    const [shoppingList, setShoppingList] = React.useState("");

    React.useEffect(() => {
        getUser();
        getRecipes().then((result) => setRecipes(result));
    // eslint-disable-next-line
  }, []);

    const getUser = async () => {
        const token = sessionStorage.getItem("token");
        try {
            if (token) {
                // Get username
                const req = {
                    method: "GET",
                    headers: {"x-auth-token": token},
                };
                const res = await fetch(`${backendBaseURL}/api/auth/`, req).then((response) => response.json());
                setName(res.username);

                // Get Calendar for user
                const reqCal = {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},

                    body: JSON.stringify({username: res.username}),
                };
                const resCal = await fetch(`${backendBaseURL}/api/calendar/getCalendar`, reqCal).then((response) => response.json());
                setCalendarObject(resCal);
                // set global variables depending on what calendar was returned
                if (resCal && resCal.calendarDates && resCal.calendarDates.length > 0) {
                    // if calendar exists and some days exist in calendarDates, check if calendarDates exist for today
                    const index = resCal.calendarDates.findIndex((calDate: any) => calDate.dateIs === currDate?.toLocaleString().split(",")[0]);
                    if (index > -1) {
                        // if calendarDates has an object for today, load into globals
                        setRecipeID(resCal.calendarDates[index].recipeOfTheDayID);
                        setRecipeTitle(resCal.calendarDates[index].recipeOfTheDayTitle);
                        setShoppingList(resCal.calendarDates[index].recipeOfTheDayIngredients);
                    }
                    else {
                        // if calendarDates does not have an object for today, default to empty
                        setRecipeID("");
                        setRecipeTitle("");
                        setShoppingList("");
                    }
                }
                else {
                    // default to empty
                    setRecipeID("");
                    setRecipeTitle("");
                    setShoppingList("");
                }
            }
        }
        catch (err) {
            console.error(err);
        }
    };

    async function getRecipes() {
        const token = sessionStorage.getItem("token");
        let fetchedRecipes: any[] = [];
        try {
            if (token) {
                const req = {
                    method: "GET",
                    headers: {"x-auth-token": token},
                };
                fetchedRecipes = await fetch(`${backendBaseURL}/api/recipes/`, req).then((response) => response.json());
            }
            // return a this users' recipes
            return fetchedRecipes;
        }
        catch (err) {
            console.log(err);
            return fetchedRecipes;
        }
    }

    // When a calendar date is selected, update currDay and recipeOfTheDay if exists
    async function updateDayAndRecipe(value: Value) {
        onChange(value);
        if (calendarObject && calendarObject.calendarDates && calendarObject.calendarDates.length > 0 && value) {
            const dateIs = value?.toLocaleString().split(",")[0];
            const index = calendarObject.calendarDates.findIndex((calDate: any) => calDate.dateIs === dateIs);
            if (index > -1) {
                // If the day exists in the calendar, set global variables with calendar variables
                setRecipeID(calendarObject.calendarDates[index].recipeOfTheDayID);
                setRecipeTitle(calendarObject.calendarDates[index].recipeOfTheDayTitle);
                setShoppingList(calendarObject.calendarDates[index].recipeOfTheDayIngredients);
            }
            else {
                // set to default
                setRecipeID("");
                setRecipeTitle("");
                setShoppingList("");
            }
        }
        else {
            // set to default
            setRecipeID("");
            setRecipeTitle("");
            setShoppingList("");
        }
    }

    // runs when a recipe is selected for a day in the calendar
    const updateRecipeAndShoppingList = (updateEvent: any) => {
        if (updateEvent && updateEvent?.target && recipes) {
            const thisID = (updateEvent.target as HTMLInputElement).value;
            // using thisID for a recipe, get the recipe index and set global variables
            const index = recipes.findIndex((recipe: any) => recipe._id === thisID);
            if (index > -1) {
                // if valid ID in ownRecipes, set global variables
                setRecipeID(recipes[index]._id);
                setRecipeTitle(recipes[index].title);
                const shopList = recipes[index].ingredients.join(", ");
                setShoppingList(shopList);
            }
            else {
                // set to default
                setRecipeID("");
                setRecipeTitle("");
                setShoppingList("");
            }
        }
    };

    // when update calendar day clicked, submit current recipe and date to api to update backend
    async function submitDay() {
        try {
            const currDateString = currDate?.toLocaleString().split(",")[0];
            if (currDateString) {
                const req = {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},

                    body: JSON.stringify({
                        username: username,
                        dateIs: currDateString,
                        recipeOfTheDayID: recipeID,
                        recipeOfTheDayTitle: recipeTitle,
                        recipeOfTheDayIngredients: shoppingList,
                    }),
                };
                const res = await fetch(`${backendBaseURL}/api/calendar/updateCalendar/`, req).then((response) => response.json());
                setCalendarObject(res);
                alert("Recipe saved successfully.");
                // returns new calendar
            }
        }
        catch (err) {
            console.error(err);
            alert("Recipe failed to save.");
        }
    }


    return (
      <>
        <NavBar></NavBar>
        <Row className={"p-3 d-flex"}>
          <div
            className={"w-100"}
            style={{ maxWidth: "2000px" }}
          >
            <Card
              className={"p-4 d-flex"}
              style={{ backgroundColor: "#F2E8DC" }}
            >
              <Row>
                <Col>
                  <div
                    className={"d-flex p-4 justify-content-center"}
                    style={{ maxWidth: "500px" }}
                  >
                    <Calendar
                      className={"justify-content-center"}
                      onChange={updateDayAndRecipe}
                      value={currDate}
                    />
                  </div>
                </Col>
                <Col className={"d-flex p-4 justify-content-center align-items-center"}>
                  <div>
                    <Stack className={"d-flex p-4"}>
                      <label>{currDate?.toLocaleString().split(",")[0]}</label>
                      <label className={"py-4"}>
                        Recipe of the day:
                        {recipeTitle}
                      </label>
                      <div>
                        <Button
                          className={"mx-auto"}
                          variant={"primary"}
                          onClick={submitDay}
                          title={"SubmitCalendarUpdate"}
                          size={"sm"}
                          style={{ backgroundColor: "#401E01" }}
                        >
                          Save recipe of the day
                        </Button>
                      </div>
                    </Stack>
                  </div>
                </Col>
                <Col>
                  <div>
                    <Stack className={"d-flex p-4"}>
                      <label>Shopping list of the day!</label>
                      <label>{shoppingList}</label>
                    </Stack>
                  </div>
                </Col>
              </Row>
            </Card>
            <Card
              className={"d-flex p-4 flex"}
              style={{ backgroundColor: "#F2E8DC" }}
            >
              <Row
                xs={"auto"}
                md={"auto"}
                lg={"auto"}
              >
                {recipes.map((entry) => (
                  <Col key={entry._id}>
                    <Stack>
                      {RecipeCard(entry)}
                      <Button
                        variant={"primary"}
                        onClick={updateRecipeAndShoppingList}
                        value={entry._id}
                        title={"SubmitRecipeUpdate"}
                        size={"sm"}
                        style={{ maxWidth: "210px", margin: "10px -10px 10px 10px", backgroundColor: "#401E01" }}
                      >
                        Select
                        {" "}
                        {entry.title}
                        {" "}
                        as recipe.
                      </Button>
                    </Stack>
                  </Col>
                ))}
              </Row>
            </Card>
          </div>
        </Row>
      </>
    );
}

export default RecipeCalendar;
