import React from "react";
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/nav-bar/nav-bar";

const backendBaseURL = process.env.REACT_APP_BACKEND_BASE_URL;

interface Recipe {
    title: string,
    desc: string,
    ingredients: string[],
    instructions: string[],
    servings: number,
    prepTime: number,
    cookingTime: number,
    isPublic: boolean
}

const CreateRecipe = () => {
    const navigate = useNavigate();

    const [recipe, setRecipe] = React.useState({
        title: "",
        desc: "",
        ingredients: [""],
        instructions: [""],
        servings: 0,
        prepTime: 0,
        cookingTime: 0,
        isPublic: true,
    } as Recipe);
    const [validated, setValidated] = React.useState<boolean>(false);
    const [ingredientErr, setIngredientErr] = React.useState<boolean>(false);
    const [instructionErr, setInstructionErr] = React.useState<boolean>(false);
    const [username, setUsername] = React.useState<string>();

    React.useEffect(() => {
        getUser();
    }, []);

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
            }
        }
        catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e: any) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false || ingredientErr || instructionErr) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            e.preventDefault();
            const token = sessionStorage.getItem("token");
            try {
                if (token && token !== "undefined") {
                    const req = {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": token,
                        },

                        body: JSON.stringify({
                            author: username,
                            title: recipe.title,
                            description: recipe.desc,
                            ingredients: recipe.ingredients,
                            instructions: recipe.instructions,
                            servingSize: recipe.servings,
                            prepTime: recipe.prepTime,
                            cookingTime: recipe.cookingTime,
                            isPublic: recipe.isPublic,
                        }),
                    };

                    await fetch(`${backendBaseURL}/api/recipes/createRecipe`, req).then((response) => response.json());

                    navigate("/collections");
                }
            }
            catch (err) {
                console.error(err);
            }
        }

        setValidated(true);
    };

    const handleChange = (e: any) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });
    };

    const handleListInput = (e: any, index: number) => {
        if (e.target?.id === "ingredient") {
            recipe.ingredients[index] = e.target.value;
        }
        else {
            recipe.instructions[index] = e.target.value;
        }
        setRecipe({ ...recipe });
    };

    const handleAddIngredient = () => {
        recipe.ingredients.push("");
        if (recipe.ingredients.length > 0) {
            setIngredientErr(false);
        }
        setRecipe({ ...recipe });
    };
    const handleAddStep = () => {
        recipe.instructions.push("");
        if (recipe.instructions.length > 0) {
            setInstructionErr(false);
        }
        setRecipe({ ...recipe });
    };

    const handleDeleteIngredient = (index: number) => {
        recipe.ingredients.splice(index, 1);
        if (recipe.ingredients.length === 0) {
            setIngredientErr(true);
        }
        setRecipe({ ...recipe });
    };

    const handleDeleteStep = (index: number) => {
        recipe.instructions.splice(index, 1);
        if (recipe.instructions.length === 0) {
            setInstructionErr(true);
        }
        setRecipe({ ...recipe });
    };

    const handlePrivate = () => {
        recipe.isPublic = !recipe.isPublic;
    };

    return (
      <>
        <NavBar></NavBar>
        <Container style={{ display: "flex", justifyContent: "center" }}>
          <Form
            noValidate={true}
            validated={validated}
            onSubmit={handleSubmit}
            style={{ width: "100%", maxWidth: "500px", paddingTop: "40px" }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              Create Recipe
            </h2>
            <Form.Group
              controlId={"title"}
              style={{ paddingBottom: "24px" }}
              title={"Title"}
            >
              <Form.Label>Title</Form.Label>
              <Form.Control
                required={true}
                name={"title"}
                type={"text"}
                onChange={(ev) => handleChange(ev)}
              />
              <Form.Control.Feedback type={"invalid"}>Please enter a title</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              controlId={"description"}
              style={{ paddingBottom: "24px" }}
              title={"Description"}
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                type={"text"}
                as={"textarea"}
                rows={3}
                name={"desc"}
                onChange={(ev) => handleChange(ev)}
              />
            </Form.Group>
            <Form.Group style={{ paddingBottom: "24px" }}>
              <Form.Label>Ingredients</Form.Label>
              {!ingredientErr
                  ? recipe.ingredients.map((ingredient, i) => (
                    <Form.Group
                      controlId={"ingredient"}
                      key={i}
                      title={"Ingredient"}
                      style={{ flexBasis: "100%", paddingBottom: "8px" }}
                    >
                      <InputGroup>
                        <Form.Control
                          type={"text"}
                          required={true}
                          value={ingredient}
                          onChange={(e) => handleListInput(e, i)}
                        />
                        <InputGroup.Text>
                          <MdCancel
                            name={"deleteIngredient"}
                            size={30}
                            onClick={(e) => handleDeleteIngredient(i)}
                          />
                        </InputGroup.Text>
                        <Form.Control.Feedback type={"invalid"}>Please enter an ingredient</Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  ))
                  : (
                    <span>
                      <br />
                      Require at least one ingredient
                      <br />
                    </span>
                  )}
              <Button
                id={"addIngredient"}
                onClick={(e) => handleAddIngredient()}
                variant={!ingredientErr ? "primary" : "danger"}
                size={"sm"}
                style={{ marginLeft: "auto", marginRight: "auto", marginTop: "8px" }}
              >
                Add Ingredient
              </Button>
            </Form.Group>
            <Form.Group style={{ paddingBottom: "24px" }}>
              <Form.Label>Instructions</Form.Label>
              {!instructionErr
                  ? recipe.instructions.map((step, i) => (
                    <Form.Group
                      key={i}
                      controlId={"instruction"}
                      title={"Instruction"}
                      style={{ flexBasis: "100%", paddingBottom: "8px" }}
                    >
                      <InputGroup>
                        <Form.Control
                          type={"text"}
                          required={true}
                          value={step}
                          onChange={(e) => handleListInput(e, i)}
                        />
                        <InputGroup.Text>
                          <MdCancel
                            name={"deleteInstruction"}
                            size={30}
                            onClick={(e) => handleDeleteStep(i)}
                          />
                        </InputGroup.Text>
                        <Form.Control.Feedback type={"invalid"}>Please enter an instruction</Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  ))
                  : (
                    <span>
                      <br />
                      Require at least one instruction
                      <br />
                    </span>
                  )}
              <Button
                variant={!instructionErr ? "primary" : "danger"}
                id={"addInstruction"}
                size={"sm"}
                style={{ marginLeft: "auto", marginRight: "auto", marginTop: "8px" }}
                onClick={(e) => handleAddStep()}
              >
                Add Instruction
              </Button>
            </Form.Group>
            <Form.Group style={{ paddingBottom: "24px" }}>
              <Form.Label>Servings</Form.Label>
              <InputGroup>
                <Form.Control
                  name={"servings"}
                  type={"number"}
                  title={"Servings"}
                  required={true}
                  onChange={(ev) => handleChange(ev)}
                />
                <InputGroup.Text>people</InputGroup.Text>
                <Form.Control.Feedback type={"invalid"}>Please enter a value</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group style={{ paddingBottom: "24px" }}>
              <Form.Label>Prep time</Form.Label>
              <InputGroup>
                <Form.Control
                  name={"prepTime"}
                  title={"PrepTime"}
                  required={true}
                  type={"number"}
                  onChange={(ev) => handleChange(ev)}
                />
                <InputGroup.Text>mins</InputGroup.Text>
              </InputGroup>
              <Form.Text>
                Enter the time in minutes
              </Form.Text>
              <Form.Control.Feedback type={"invalid"}>Please enter a value</Form.Control.Feedback>
            </Form.Group>
            <Form.Group style={{ paddingBottom: "24px" }}>
              <Form.Label>Cooking time</Form.Label>
              <InputGroup>
                <Form.Control
                  name={"cookingTime"}
                  type={"number"}
                  title={"CookingTime"}
                  required={true}
                  onChange={(ev) => handleChange(ev)}
                />
                <InputGroup.Text>mins</InputGroup.Text>
              </InputGroup>
              <Form.Text>
                Enter the time in minutes
              </Form.Text>
              <Form.Control.Feedback type={"invalid"}>Please enter a value</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              title={"checkboxIsPrivate"}
              controlId={"formBasicCheckbox"}
              onChange={(ev) => handlePrivate()}
              style={{ paddingBottom: "24px" }}
            >
              <Form.Check
                type={"checkbox"}
                label={"Make Recipe Private"}
              />
            </Form.Group>
            <div style={{ display: "flex", paddingBottom: "24px", justifyContent: "space-between" }}>
              <Button
                variant={"danger"}
                title={"Cancel"}
                size={"lg"}
                href={"/collections"}
              >
                Cancel
              </Button>
              <Button
                variant={"primary"}
                type={"submit"}
                title={"Submit"}
                size={"lg"}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Container>
      </>
    );
};

export default CreateRecipe;
