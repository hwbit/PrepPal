/* eslint-disable testing-library/no-wait-for-empty-callback */
/* eslint-disable no-shadow */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../../pages/home";
import { mockFetch } from "../../test-utils/mock-fetch";

describe("Home component tests", () => {
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
        image: "logo.png",
    };

    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(jest.fn());
    });

    afterEach(() => {
        sessionStorage.removeItem("token");
    });

    describe("Unit tests", () => {
        test("Render standard component --> Title", () => {
            render(<BrowserRouter><Home /></BrowserRouter>);

            const title = screen.getByText("Explore");
            expect(title).toBeTruthy();
        });
    });

    describe("Integration tests", () => {
        test("Recipe catalog populates home page with recipes", async () => {
            window.fetch = mockFetch([testRecipe]);
            await render(<BrowserRouter><Home /></BrowserRouter>);

            await waitFor(() => { });

            const recipeTitle = screen.getByText(testRecipe.title);
            const recipeAuthor = screen.getByText(testRecipe.author);
            const recipeDesc = screen.getByText(testRecipe.description);

            expect(recipeTitle).toBeTruthy();
            expect(recipeAuthor).toBeTruthy();
            expect(recipeDesc).toBeTruthy();
        });
    });
});
