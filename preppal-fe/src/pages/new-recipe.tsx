
import React from 'react';
import { Form, Button, Container, InputGroup } from 'react-bootstrap';
import { MdCancel } from 'react-icons/md';

interface Recipe {
    title: string,
    desc: string,
    ingredients: string[],
    instructions: string[],
    servings: number,
    prepTime: number,
    cookingTime: number
}

const NewRecipe = () => {
    const [recipe, setRecipe] = React.useState({
        title: "",
        desc: "",
        ingredients: [""],
        instructions: [""],
        servings: 0,
        prepTime: 0,
        cookingTime: 0
    } as Recipe);
    const [validated, setValidated] = React.useState<boolean>(false);
    const [ingredientErr, setIngredientErr] = React.useState<boolean>(false);
    const [instructionErr, setInstructionErr] = React.useState<boolean>(false);

    const handleSubmit = (e: any) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false || ingredientErr || instructionErr) {
            e.preventDefault();
            e.stopPropagation();
        } else {

        }

        setValidated(true);
    }

    const handleChange = (e: any) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });
    };

    const handleListInput = (e: any, index: number) => {
        if (e.target?.id === "ingredients") {
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
    }

    const handleDeleteStep = (index: number) => {
        recipe.instructions.splice(index, 1);
        if (recipe.instructions.length === 0) {
            setInstructionErr(true);
        }
        setRecipe({ ...recipe });
    }

    return (
        <Container style={{ display: 'flex', justifyContent: 'center' }}>
            <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                style={{ width: '100%', maxWidth: '500px', paddingTop: '40px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    Create Recipe
                </h2>
                <Form.Group style={{ paddingBottom: '24px' }}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        required
                        name='title'
                        type='text'
                        onChange={(event) => handleChange(event)}
                    />
                    <Form.Control.Feedback type="invalid">Please enter a title</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='description' style={{ paddingBottom: '24px' }}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text' as='textarea'
                        rows={3}
                        name='desc'
                        onChange={(event) => handleChange(event)} />
                </Form.Group>
                <Form.Group style={{ paddingBottom: '24px' }}>
                    <Form.Label>Ingredients</Form.Label>
                    {!ingredientErr
                        ? recipe.ingredients.map((ingredient, i) => (
                            <Form.Group
                                controlId='ingredients'
                                style={{ flexBasis: "100%", paddingBottom: '8px' }}>
                                <InputGroup>
                                    <Form.Control
                                        type='text'
                                        required
                                        value={ingredient}
                                        onChange={(e) => handleListInput(e, i)} />
                                    <InputGroup.Text>
                                        <MdCancel
                                            name="deleteIngredient"
                                            size={30}
                                            onClick={(e) => handleDeleteIngredient(i)} />
                                    </InputGroup.Text>
                                    <Form.Control.Feedback type="invalid">Please enter an ingredient</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        ))
                        : <span>Require at least one ingredient</span>}
                    <Button
                        id='addIngredient'
                        onClick={(e) => handleAddIngredient()}
                        variant={!ingredientErr ? 'primary' : 'danger'}
                        size='sm'
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        Add Ingredient
                    </Button>
                </Form.Group>
                <Form.Group style={{ paddingBottom: '24px' }}>
                    <Form.Label>Instructions</Form.Label>
                    {!instructionErr
                        ? recipe.instructions.map((step, i) => (
                            <Form.Group
                                controlId='instructions'
                                style={{ flexBasis: "100%", paddingBottom: '8px' }}>
                                <InputGroup>
                                    <Form.Control
                                        type='text'
                                        required
                                        value={step}
                                        onChange={(e) => handleListInput(e, i)} />
                                    <InputGroup.Text>
                                        <MdCancel
                                            name="deleteInstruction"
                                            size={30}
                                            onClick={(e) => handleDeleteStep(i)} />
                                    </InputGroup.Text>
                                    <Form.Control.Feedback type="invalid">Please enter an instruction</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        ))
                        : <span>Require at least one instruction</span>}
                    <Button
                        variant={!instructionErr ? 'primary' : 'danger'}
                        id='addInstruction'
                        size='sm'
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                        onClick={(e) => handleAddStep()}>
                        Add Instruction
                    </Button>

                </Form.Group>
                <Form.Group style={{ paddingBottom: '24px' }}>
                    <Form.Label>Servings</Form.Label>
                    <Form.Control
                        name='servings'
                        type='text'
                        required
                        onChange={(event) => handleChange(event)} />
                    <Form.Control.Feedback type="invalid">Please enter a value</Form.Control.Feedback>
                </Form.Group>
                <Form.Label>Prep time</Form.Label>
                <Form.Group style={{ paddingBottom: '24px' }}>
                    <Form.Control
                        name='prepTime'
                        required
                        type='text'
                        onChange={(event) => handleChange(event)} />
                    <Form.Text>
                        Enter the time in minutes
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">Please enter a value</Form.Control.Feedback>
                </Form.Group>
                <Form.Group style={{ paddingBottom: '24px' }}>
                    <Form.Label>Cooking time</Form.Label>
                    <Form.Control
                        name='cookingTime'
                        type='text'
                        required
                        onChange={(event) => handleChange(event)} />
                    <Form.Text>
                        Enter the time in minutes
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">Please enter a value</Form.Control.Feedback>
                </Form.Group>
                <div style={{ display: 'flex', paddingBottom: '24px', justifyContent: 'space-between' }}>
                    <Button
                        variant='danger'
                        title='Cancel'
                        size='lg'
                        href="/collections">
                        Cancel
                    </Button>
                    <Button
                        variant='primary'
                        type='submit'
                        title='Submit'
                        size='lg'
                    >
                        Submit
                    </Button>
                </div>
            </Form>
        </Container >
    );
};

export default NewRecipe;
