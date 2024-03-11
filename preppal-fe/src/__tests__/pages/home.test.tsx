/* eslint-disable testing-library/no-wait-for-empty-callback */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import Home from "../../pages/home";
import { mockFetch } from "../mock-fetch";

describe('Home component tests', () => {
    const testRecipe = {
        _id: "recipe-id",
        author: "random author",
        description: "random desc",
        title: "recipe title",
        titleUrl: "test-recipe-1234",
        ingredients: ["1"],
        instructions: ["1"],
        servingSize: 1,
        prepTime: 1,
        cookingTime: 1,
        isPublic: false,
    };

    afterEach(() => {
        sessionStorage.removeItem('token');
    });

    describe("Unit tests", () => {
        test('Render standard component --> Title', () => {
            render(<BrowserRouter><Home /></BrowserRouter>);

            const title = screen.getByText("Explore");
            expect(title).toBeTruthy();
        });
    });

    describe("Integration tests", () => {
        test('Recipe catalog populates home page with recipes', async () => {
            window.fetch = mockFetch([testRecipe]);
            await render(<BrowserRouter><Home /></BrowserRouter>);

            await waitFor(() => { });

            const recipeCard = screen.queryByText(testRecipe.title)
            expect(recipeCard).toBeTruthy();

            const recipeTitle = screen.getByText(testRecipe.title);
            const recipeAuthor = screen.getByText(testRecipe.author);
            const recipeDesc = screen.getByText(testRecipe.description);

            expect(recipeTitle).toBeTruthy();
            expect(recipeAuthor).toBeTruthy();
            expect(recipeDesc).toBeTruthy();
        });

        //TODO: move to recipe card tests
        // test('Clicking on recipe card navigates to selected recipe', async () => {
        //     window.fetch = mockFetch([testRecipe]);
        //     await render(<BrowserRouter><Home /></BrowserRouter>);

        //     await waitFor(() => { });

        //     const link = screen.getByTitle("recipe-link");
        //     await act(() => fireEvent.click(link));

        //     await waitFor(() => { });

        //     const recipeTitle = screen.getByText(testRecipe.title);
        //     const recipeIngredients = screen.getByText(testRecipe.ingredients[0]);
        //     const recipeInstructions = screen.getByText(testRecipe.instructions[0]);
        //     const recipeAuthor = screen.getByText(testRecipe.author);
        //     const recipeServingSize = screen.getByText(testRecipe.servingSize);
        //     const recipeCookingTime = screen.getByText(testRecipe.cookingTime);
        //     const recipePrepTime = screen.getByText(testRecipe.prepTime);

        //     expect(recipeTitle).toBeTruthy();
        //     expect(recipeInstructions).toBeTruthy();
        //     expect(recipeIngredients).toBeTruthy();
        //     expect(recipeCookingTime).toBeTruthy();
        //     expect(recipePrepTime).toBeTruthy();
        //     expect(recipeAuthor).toBeTruthy();
        //     expect(recipeServingSize).toBeTruthy();
        // });
    });
})

