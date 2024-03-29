/* eslint-disable no-shadow */
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateRecipe from "../../pages/create-recipe";

describe("Create recipe tests", () => {
    describe("Unit tests", () => {
        test("Render standard component --> Buttons", async () => {
            render(<BrowserRouter><CreateRecipe /></BrowserRouter>);

            const submitBtn = screen.queryByText("Submit");
            const cancelBtn = screen.queryByText("Cancel");

            expect(submitBtn).toBeTruthy();
            expect(cancelBtn).toBeTruthy();
        });

        test("Render standard component --> Input title fields", () => {
            render(<BrowserRouter><CreateRecipe /></BrowserRouter>);

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

        test("Render standard component --> Input fields", () => {
            render(<BrowserRouter><CreateRecipe /></BrowserRouter>);

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
    });
});
