/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-empty-callback */
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import Collections from "../../pages/collections";
import { mockFetch } from "../../test-utils/mock-fetch";

describe('Collections page tests', () => {
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
        image: "logo.png"
    };

    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
    });

    afterEach(() => {
        sessionStorage.removeItem('token');
    });

    describe("Unit tests", () => {
        test('Render standard component --> Buttons', async () => {
            render(<BrowserRouter><Collections /></BrowserRouter>);

            const myRecipesBtn = screen.queryByText("My Recipes");
            const favouritesBtn = screen.queryByText("Favourites");

            expect(myRecipesBtn).toBeTruthy();
            expect(favouritesBtn).toBeTruthy();
        });
    });

    describe("Integration tests", () => {
        test("Should populate the tabs with recipes", async () => {
            window.fetch = mockFetch([testRecipe]);
            sessionStorage.setItem("token", "random-token");
            await render(<BrowserRouter><Collections /></BrowserRouter>);

            await waitFor(() => { });

            await waitFor(() => { });

            const recipeTitle = screen.queryAllByText(testRecipe.title);
            const recipeAuthor = screen.queryAllByText(testRecipe.author);
            const recipeDesc = screen.queryAllByText(testRecipe.description);

            expect(recipeTitle.length).toBe(2);
            expect(recipeAuthor.length).toBe(2);
            expect(recipeDesc.length).toBe(2);
        });
    });
});

