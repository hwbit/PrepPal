import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import NewRecipe from "../../pages/new-recipe";

describe('New recipe tests', () => {
    test('Render standard component --> Buttons', async () => {
        render(<BrowserRouter><NewRecipe /></BrowserRouter>);

        const submitBtn = screen.queryByText("Submit");
        const cancelBtn = screen.queryByText("Cancel");

        expect(submitBtn).toBeTruthy();
        expect(submitBtn).toHaveAttribute('type', 'submit');
        expect(cancelBtn).toBeTruthy();
    });

    test('Render standard component --> input title fields', () => {
        render(<BrowserRouter><NewRecipe /></BrowserRouter>);

        const title = screen.queryByText("Title");
        expect(title).toBeTruthy();
        const desc = screen.queryByText("Description");
        expect(desc).toBeTruthy();
        const ingredients = screen.queryByText("Ingredients");
        expect(ingredients).toBeTruthy();
        const instructions = screen.queryByText("Instructions");
        expect(instructions).toBeTruthy();
        const servings = screen.queryByText("Servings");
        expect(servings).toBeTruthy();
        const prepTime = screen.queryByText("Prep time");
        expect(prepTime).toBeTruthy();
        const cookingTime = screen.queryByText("Cooking time");
        expect(cookingTime).toBeTruthy();
    });

    test('Render standard component --> input fields', () => {
        render(<BrowserRouter><NewRecipe /></BrowserRouter>);

        const title = screen.queryByTitle("Title");
        expect(title).toBeTruthy();
        const desc = screen.queryByTitle("Description");
        expect(desc).toBeTruthy();
        const ingredients = screen.queryByTitle("Ingredient");
        expect(ingredients).toBeTruthy();
        const instructions = screen.queryByTitle("Instruction");
        expect(instructions).toBeTruthy();
        const servings = screen.queryByTitle("Servings");
        expect(servings).toBeTruthy();
        const prepTime = screen.queryByTitle("PrepTime");
        expect(prepTime).toBeTruthy();
        const cookingTime = screen.queryByTitle("CookingTime");
        expect(cookingTime).toBeTruthy();
    });
})
