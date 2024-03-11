/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import Home from "../../pages/home";

describe('Home component tests', () => {
    // const testRecipe = {
    //     author: "random author",
    //     title: "recipe title",
    //     titleUrl: "test-recipe-1234",
    //     ingredients: ["1"],
    //     instructions: ["1"],
    //     servingSize: 1,
    //     prepTime: 1,
    //     cookingTime: 1,
    //     isPublic: false,
    // };

    describe("Unit tests", () => {
        test('Render standard component --> Title', () => {
            render(<BrowserRouter><Home /></BrowserRouter>);

            const title = screen.getByText("Explore");
            expect(title).toBeTruthy();
        });
    });

    // describe("Integration tests", () => {
    //     test('Clicking on recipe card navigates to selected recipe', async () => {
    //         await render(<BrowserRouter><Home /></BrowserRouter>);
    //         window.fetch = mockFetch({ "recipes": [testRecipe] });
    //         await waitFor(() => {
    //             expect(screen.getByText(testRecipe.title)).toBeTruthy();
    //         });

    //         await act(() => fireEvent.click(screen.getByText(testRecipe.title)));

    //         // await act(() => render(<BrowserRouter><Recipe /></BrowserRouter>));

    //         const recipeTitle = screen.getByText(testRecipe.title);
    //         const recipeIngredients = screen.getByText(testRecipe.ingredients[0]);
    //         const recipeInstructions = screen.getByText(testRecipe.instructions[0]);
    //         const recipeAuthor = screen.getByText(testRecipe.author);
    //         const recipeServingSize = screen.getByText(testRecipe.servingSize);
    //         const recipeCookingTime = screen.getByText(testRecipe.cookingTime);
    //         const recipePrepTime = screen.getByText(testRecipe.prepTime);

    //         expect(recipeTitle).toBeTruthy();
    //         expect(recipeInstructions).toBeTruthy();
    //         expect(recipeIngredients).toBeTruthy();
    //         expect(recipeCookingTime).toBeTruthy();
    //         expect(recipePrepTime).toBeTruthy();
    //         expect(recipeAuthor).toBeTruthy();
    //         expect(recipeServingSize).toBeTruthy();
    //     });
    // });
})

