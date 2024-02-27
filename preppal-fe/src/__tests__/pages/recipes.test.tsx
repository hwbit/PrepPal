import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import Recipe from "../../pages/recipe";

const recipeInfo: any = {
    author: "John Doe",
    title: "Chicken's Fried Rice",
    description: "A chicken fried this rice.",
    image: "logo.png",
    ingredients: ["Rice","Chicken","Green onion"],
    instructions: ["Cook chicken","Fry rice"],
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
        expect(title).toBeTruthy();
        const desc = screen.queryByText("A chicken fried this rice.");
        expect(desc).toBeTruthy();
        const author = screen.queryByText("Author: John Doe");
        expect(author).toBeTruthy();
        const date = screen.queryByText("Date published: Feb 17 2024");
        expect(date).toBeTruthy();
        const ingredients = screen.queryByText("Ingredients");
        expect(ingredients).toBeTruthy();
        const instructions = screen.queryByText("Instructions");
        expect(instructions).toBeTruthy();
        const servings = screen.queryByText("Serving Size: 1");
        expect(servings).toBeTruthy();
        const prepTime = screen.queryByText("Prep Time:");
        expect(prepTime).toBeTruthy();
        const cookingTime = screen.queryByText("Cooking Time:");
        expect(cookingTime).toBeTruthy();
        const totalTime = screen.queryByText("Total Time:");
        expect(totalTime).toBeTruthy();
    });
})

