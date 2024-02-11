
import { Container, Form, Button, Stack } from 'react-bootstrap';
import { MdCancel } from 'react-icons/md';

const LoginPage = () => {

    return (
        <Container className="d-flex justify-content-center">
            <div className="w-100" style={{ maxWidth: '400px', paddingTop: '16px'}}>
                <h2 className="text-center mb-4">Create Recipe</h2>
                <Form>
                    <Form.Group controlId="recipeName" style={{ paddingBottom: '16px' }}>
                        Recipe Name
                        <Form.Control type="name" />
                    </Form.Group>

                    <Form.Group controlId="recipeDesc" style={{ paddingBottom: '24px' }}>
                        Recipe Description
                        <Form.Control type="description" as="textarea" rows={3}/>
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        Upload Picture
                        <Form.Control type="file" />
                        Max file size: 30MB.
                    </Form.Group>

                    Ingredients
                    <Stack direction="horizontal" gap={2}>
                        <Form.Group controlId="recipeIngredient" style={{ paddingBottom: '8px', width: '90%' }}>
                            <Form.Control type="ingredient" />
                        </Form.Group>
                        <MdCancel size={30}/>
                    </Stack>

                    <div style={{ paddingBottom: '24px' }}>
                        <Button className="mx-auto" variant="primary" title="Add Ingredient" size="sm">
                            Add Ingredient
                        </Button>
                    </div>

                    Directions
                    <Stack direction="horizontal" gap={2}>
                        <Form.Group controlId="recipeStep" style={{ paddingBottom: '8px', width: '90%' }}>
                            <Form.Control type="step" />
                        </Form.Group>
                        <MdCancel size={30}/>
                    </Stack>
                    <div style={{ paddingBottom: '24px' }}>
                        <Button className="mx-auto" variant="primary" title="Add Step" size="sm">
                            Add Step
                        </Button>
                    </div>

                    <Form.Group controlId="recipeServingSize" style={{ paddingBottom: '24px' }}>
                        Serving Size
                        <Form.Control type="servingSize" />
                    </Form.Group>

                    Prep Time
                    <Form.Group controlId="recipePrepTime" style={{ paddingBottom: '24px' }}>
                        <Stack direction="horizontal">
                            <Form.Control type="prepTime"/>
                            <Form.Select style={{ width: '50%'}}>
                                <option value={1}>mins</option>
                                <option value={2}>hours</option>
                            </Form.Select>
                        </Stack>
                    </Form.Group>

                    <Form.Group controlId="recipeCookeTime" style={{ paddingBottom: '24px' }}>
                        Cook Time
                        <Stack direction="horizontal">
                            <Form.Control type="cookTime"/>
                            <Form.Select style={{ width: '50%'}}>
                                <option value={1}>mins</option>
                                <option value={2}>hours</option>
                            </Form.Select>
                        </Stack>
                    </Form.Group>

                    <div className="float-end">
                        <Button className="mx-auto" variant="tertiary" title="Cancel" size="lg">
                            Cancel
                        </Button>
                        <Button className="mx-auto" variant="primary" type="submit" title="Submit" size="lg">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default LoginPage;
