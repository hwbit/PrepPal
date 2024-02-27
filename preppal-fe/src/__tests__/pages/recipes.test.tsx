import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import Recipe from "../../pages/recipe";

const recipeInfo: any = {
    author: "John Doe",
    title: "Chicken's Fried Rice",
    description: "A chicken fried this rice.",
    image: "logo.png",
    ingredients: ["ingredient 1","ingredient 2"],
    instructions: ["step 1","step 2"],
    servingSize: 1,
    prepTime: 20,
    cookingTime: 30,
    creationDate: new Date("2024-02-17T21:49:08.000Z")
}

const mockUseLocation = {
    pathname: '/testApiSandboxAccount/test-recipe-1000',
    key: '',
    search: '',
    hash: '',
    state: { recipeInfo },
};

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => mockUseLocation,
}));

describe('Collections page tests', () => {
    test('Render standard component --> headers', async () => {
        render(<BrowserRouter><Recipe /></BrowserRouter>);

        const title = screen.queryByText("Chicken's Fried Rice");
        const desc = screen.queryByText("A chicken fried this rice.");
        const author = screen.queryByText("Author: John Doe");
        const date = screen.queryByText("Date published: Feb 17 2024");
        const ingredientsHeader = screen.queryByText("Ingredients");
        const ingredient1 = screen.queryByText("ingredient 1");
        const ingredient2 = screen.queryByText("ingredient 2");
        const instructionsHeader = screen.queryByText("Instructions");
        const step1 = screen.queryByText("step 1");
        const step2 = screen.queryByText("step 2");
        const servings = screen.queryByText("Serving Size: 1");
        const prepTimeSubtitle = screen.queryByText("Prep Time:");
        const prepTime = screen.queryByText("20 min");
        const cookingTimeSubtitle = screen.queryByText("Cooking Time:");
        const cookingTime = screen.queryByText("30 min");
        const totalTimeSubtitle = screen.queryByText("Total Time:");
        const totalTime = screen.queryByText("50 min");

        expect(title).toBeTruthy();
        expect(desc).toBeTruthy();
        expect(author).toBeTruthy();
        expect(date).toBeTruthy();
        expect(ingredientsHeader).toBeTruthy();
        expect(ingredient1).toBeTruthy();
        expect(ingredient2).toBeTruthy();
        expect(instructionsHeader).toBeTruthy();
        expect(step1).toBeTruthy();
        expect(step2).toBeTruthy();
        expect(servings).toBeTruthy();
        expect(prepTimeSubtitle).toBeTruthy();
        expect(prepTime).toBeTruthy();
        expect(cookingTimeSubtitle).toBeTruthy();
        expect(cookingTime).toBeTruthy();
        expect(totalTimeSubtitle).toBeTruthy();
        expect(totalTime).toBeTruthy();
    });
})

