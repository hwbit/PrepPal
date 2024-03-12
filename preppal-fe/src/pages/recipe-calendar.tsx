import Calendar from 'react-calendar';
import NavBar from '../components/nav-bar/nav-bar';
import { Button, Card, Col, Row, Stack } from 'react-bootstrap';
import React from 'react';
import RecipeCard from '../components/recipe-card/recipe-card';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function RecipeCalendar() {
  const [currDate, onChange] = React.useState<Value>(new Date());
  const [username, setName] = React.useState("");
  const [ownRecipes, setOwnRecipes] = React.useState<any[]>([]);
  const [calendarObject, setCalendarObject] = React.useState<any>();
  const [recipeID, setRecipeID] = React.useState("");
  const [recipeTitle, setRecipeTitle] = React.useState("");
  const [shoppingList, setShoppingList] = React.useState("");

  React.useEffect(() => {
    getUser();
    getOwnRecipes().then(result => setOwnRecipes(result));
    // eslint-disable-next-line
  }, []);

  const getUser = async () => {
    const token = sessionStorage.getItem("token");
    try {
      if (token) {
        //Get username
        const req = {
          method: "GET",
          headers: {
            "x-auth-token": token
          }
        };
        const res = await fetch("http://localhost:9001/api/auth/", req).then(res => res.json());
        setName(res.username);

        //Get Calendar for user
        const reqCal = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            'username': res.username
          })
        };
        const resCal = await fetch("http://localhost:9001/api/calendar/getCalendar", reqCal).then(res => res.json());
        setCalendarObject(resCal);///Confirm response object is what you intend...
        if (resCal && resCal.calendarDates && resCal.calendarDates.length > 0) {
          const index = resCal.calendarDates.findIndex((calDate: any) => calDate.dateIs === currDate?.toLocaleString().split(",")[0]);
          if (index > -1) {
            setRecipeID(resCal.calendarDates[index].recipeOfTheDayID);
            setRecipeTitle(resCal.calendarDates[index].recipeOfTheDayTitle);
            setShoppingList(resCal.calendarDates[index].recipeOfTheDayIngredients);
          }
          else {
            setRecipeID("");
            setRecipeTitle("");
            setShoppingList("");
          }
        }
        else {
          setRecipeID("");
          setRecipeTitle("");
          setShoppingList("");
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function getOwnRecipes() {
    const token = sessionStorage.getItem("token");
    let fetchedRecipes: any[] = [];
    try {
      if (token) {
        const req = {
          method: "GET",
          headers: {
            'x-auth-token': token
          }
        };
        fetchedRecipes = await fetch("http://localhost:9001/api/users/ownRecipes/", req).then((res) => res.json());
      }
      return fetchedRecipes;
    }
    catch (err) {
      console.log(err);
      return fetchedRecipes;
    }
  }

  //When a calendar date is selected, update currDay and recipeOfTheDay
  async function updateDayAndRecipe(value: Value) {
    onChange(value);
    if (calendarObject && calendarObject.calendarDates && calendarObject.calendarDates.length > 0) {
      const index = calendarObject.calendarDates.findIndex((calDate: any) => calDate.dateIs === value?.toString());
      //If the day exists in the calendar, set variables with calendar variables
      if (index > -1) {
        setRecipeID(calendarObject.calendarDates[index].recipeOfTheDayID);
        setRecipeTitle(calendarObject.calendarDates[index].recipeOfTheDayTitle);
        setShoppingList(calendarObject.calendarDates[index].recipeOfTheDayIngredients);
      }
      //else, clear variables out
      else {
        setRecipeID("");
        setRecipeTitle("");
        setShoppingList("");
      }
    }
    else {
      setRecipeID("");
      setRecipeTitle("");
      setShoppingList("");
    }
  }

  //Need to rework recipe cards to be able to get ID, Title, and ingredients
  const updateRecipeAndShoppingList = (event: any) => {
    if (event && event?.target && ownRecipes) {

      const thisID = (event.target as HTMLInputElement).value
      //onSelect of a recipe, get the ID, Title, and ingredients
      const index = ownRecipes.findIndex((recipe: any) => recipe._id === thisID);
      if (index > -1) {
        setRecipeID(ownRecipes[index]._id);
        setRecipeTitle(ownRecipes[index].title);
        const shoppingList = ownRecipes[index].ingredients.join(", ");
        setShoppingList(shoppingList);
      }
      else {
        setRecipeID("");
        setRecipeTitle("");
        setShoppingList("");
      }
    }
  }

  async function submitDay() {
    try {
      const currDateString = currDate?.toLocaleString().split(",")[0];
      if (currDateString !== undefined) {
        const req = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            "username": username,
            "dateIs": currDateString,
            "recipeOfTheDayID": recipeID,
            "recipeOfTheDayTitle": recipeTitle,
            "recipeOfTheDayIngredients": shoppingList
          })
        };
        const res = await fetch("http://localhost:9001/api/calendar/updateCalendar/", req)//.then(res => res.json());
        setCalendarObject(res);
        //may be newCalendar or calendar. debug to confirm...
      }
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <><NavBar></NavBar>
      <Row className='p-3 d-flex'>
        <div className="w-100" style={{ maxWidth: '2000px' }}>
          <Card className='p-4 d-flex' style={{ backgroundColor: "#F2E8DC" }}>
            <Row>
              <Col>
                <div className='d-flex p-4 justify-content-center' style={{ maxWidth: '500px' }}>
                  <Calendar className={'justify-content-center'} onChange={updateDayAndRecipe} value={currDate} />
                </div>
              </Col>
              <Col className='d-flex p-4 justify-content-center align-items-center'>
                <div>
                  <Stack className='d-flex p-4'>
                    <label>{currDate?.toLocaleString().split(",")[0]}</label>
                    <label className='py-4'>Recipe of the day: {recipeTitle}</label>
                    <div>
                      <Button className="mx-auto" variant="primary" onClick={submitDay} title="SubmitUpdate" size="sm" style={{ backgroundColor: "#401E01" }}>
                        Update calendar Day
                      </Button>
                    </div>
                  </Stack>
                </div>
              </Col>
              <Col>
                <div>
                  <Stack className='d-flex p-4'>
                    <label>Shopping list of the day!</label>
                    <label>{shoppingList}</label>
                  </Stack>
                </div>
              </Col>
            </Row>
          </Card>
          <Card className={'d-flex p-4'} style={{ backgroundColor: "#F2E8DC" }}>
            <Row>
              {ownRecipes.map((entry) => (
                <Col key={entry._id}>
                  <Stack>
                    {RecipeCard(entry)}
                    <Button variant="primary" onClick={updateRecipeAndShoppingList} value={entry._id} title="SubmitUpdate" size="sm" style={{ maxWidth: '200px', backgroundColor: "#401E01" }}>
                      Select {entry.title} as recipe.
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
