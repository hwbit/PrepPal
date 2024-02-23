
import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
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
    const [errors, setErrors] = React.useState<string[]>([]);

    const handleSubmit = (e: any) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
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

    const handleAddItem = (e: any) => {
        if (e.target?.id === "addIngredient") {
            recipe.ingredients.push("");
        }
        else {
            recipe.instructions.push("");
        }

        setRecipe({ ...recipe });
    };

    const handleDeleteItem = (e: any, index: number) => {
        if (e.target?.id === "deleteIngredient") {
            recipe.ingredients.splice(index, 1);
        }
        else {
            recipe.instructions.splice(index, 1);
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
                    {recipe.ingredients.map((ingredient, i) => (
                        <Form.Group
                            controlId='ingredients'
                            style={{ flexBasis: "100%" }}>
                            <Form.Control
                                type='text'
                                required
                                value={ingredient}
                                onChange={(e) => handleListInput(e, i)} />
                            <MdCancel
                                id="deleteIngredient"
                                size={30}
                                onClick={(e) => handleDeleteItem(e, i)} />
                        </Form.Group>
                    ))}
                    <Button
                        id='addIngredient'
                        onClick={(e) => handleAddItem(e)}
                        variant='primary'
                        size='sm'
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        Add Ingredient
                    </Button>
                </Form.Group>
                <Form.Group style={{ paddingBottom: '24px' }}>
                    <Form.Label>Instructions</Form.Label>
                    {recipe.instructions.map((step, i) => (
                        <Form.Group
                            controlId='instructions'
                            style={{ flexBasis: "100%" }}>
                            <Form.Control
                                type='text'
                                required
                                value={step}
                                onChange={(e) => handleListInput(e, i)} />
                            <MdCancel
                                id="deleteInstruction"
                                size={30}
                                onClick={(e) => handleDeleteItem(e, i)} />
                        </Form.Group>
                    ))}
                    <Button
                        variant='primary'
                        id='addInstruction'
                        size='sm'
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                        onClick={(e) => handleAddItem(e)}>
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
