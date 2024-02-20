
import { Container, Form, Button, Stack } from 'react-bootstrap';
import { MdCancel } from 'react-icons/md';

const NewRecipe = () => {

    return (
        <Container style={{ display: 'flex', justifyContent: 'center' }}>
            <Form style={{ width: '100%', maxWidth: '500px', paddingTop: '40px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    Create Recipe
                </h2>
                <Form.Group controlId='title' style={{ paddingBottom: '24px' }}>
                    Title
                    <Form.Control type='text' />
                </Form.Group>
                <Form.Group controlId='description' style={{ paddingBottom: '24px' }}>
                    Description
                    <Form.Control type='text' as='textarea' rows={3} />
                </Form.Group>
                Ingredients
                <Stack direction='horizontal' gap={2} style={{ paddingBottom: '8px' }}>
                    <Form.Group controlId='ingredients' style={{ flexBasis: "100%" }}>
                        <Form.Control type='text' />
                    </Form.Group>
                    <MdCancel size={30} />
                </Stack>
                <div style={{ paddingBottom: '24px' }}>
                    <Button variant='primary' title='Add Ingredient' size='sm' style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        Add Ingredient
                    </Button>
                </div>
                Instructions
                <Stack direction='horizontal' gap={2} style={{ paddingBottom: '8px' }}>
                    <Form.Group controlId='instructions' style={{ flexBasis: '100%' }}>
                        <Form.Control type='text' />
                    </Form.Group>
                    <MdCancel size={30} />
                </Stack>
                <div style={{ paddingBottom: '24px' }}>
                    <Button variant='primary' title='Add Step' size='sm' style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        Add Instruction
                    </Button>
                </div>

                <Form.Group controlId='servingSize' style={{ paddingBottom: '24px' }}>
                    Servings
                    <Form.Control type='text' />
                </Form.Group>

                Prep Time
                <Form.Group controlId='prepTime' style={{ paddingBottom: '24px' }}>
                    <Stack direction='horizontal'>
                        <Form.Control type='text' />
                        <Form.Select style={{ width: '50%' }}>
                            <option value={1}>mins</option>
                            <option value={2}>hours</option>
                        </Form.Select>
                    </Stack>
                </Form.Group>

                <Form.Group controlId='cookingTime' style={{ paddingBottom: '24px' }}>
                    Cooking Time
                    <Stack direction='horizontal'>
                        <Form.Control type='text' />
                        <Form.Select style={{ width: '50%' }}>
                            <option value={1}>mins</option>
                            <option value={2}>hours</option>
                        </Form.Select>
                    </Stack>
                </Form.Group>

                <div style={{ display: 'flex', paddingBottom: '24px', justifyContent: 'space-between' }}>
                    <Button variant='danger' title='Cancel' size='lg'>
                        Cancel
                    </Button>
                    <Button variant='primary' type='submit' title='Submit' size='lg'>
                        Submit
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default NewRecipe;
