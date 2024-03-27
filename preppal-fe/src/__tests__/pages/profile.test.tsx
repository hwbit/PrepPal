/* eslint-disable testing-library/no-wait-for-empty-callback */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable no-shadow */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Profile from "../../pages/profile";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import { mockFetch } from "../../test-utils/mock-fetch";

describe("Profile component tests", () => {
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

    const ownProfile = {
        username: "test user",
        bio: "test user profile",
        following: ["following-1"],

    };

    const otherProfile = {
        username: "test user",
        bio: "test user profile",
        following: ["following-1"],
        recipes: [testRecipe],
    };

    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(jest.fn());
    });

    afterEach(() => {
        sessionStorage.clear();
    });

    describe("Unit tests", () => {
        test("Render standard component --> Input fields", () => {
            render(<BrowserRouter><Profile /></BrowserRouter>);

            const bio = screen.queryByText("Bio");
            expect(bio).toBeTruthy();
            const recipes = screen.queryByText("Recipes");
            expect(recipes).toBeTruthy();
            const following = screen.queryByText("Following: 0");
            expect(following).toBeTruthy();
        });
    });

    describe("Integration tests", () => {
        test("Clicking on your own profile should display following", async () => {
            sessionStorage.setItem("token", "test-token");
            window.fetch = mockFetch(ownProfile);
            await render(<BrowserRouter><Profile /></BrowserRouter>);

            await waitFor(() => { });

            await waitFor(() => { });

            const username = screen.getByText(ownProfile.username);
            const bio = screen.getByText(ownProfile.bio);
            const followingOne = screen.getByText(ownProfile.following[0]);
            const followingCount = screen.getByText(`Following: ${ownProfile.following.length.toString()}`);

            expect(username).toBeTruthy();
            expect(bio).toBeTruthy();
            expect(followingOne).toBeTruthy();
            expect(followingCount).toBeTruthy();
        });

        test("Clicking on other's profile should display following", async () => {
            window.fetch = mockFetch(otherProfile);
            await render(
              <MemoryRouter initialEntries={[`/profile/${otherProfile.username}`]}>
                <Routes>
                  <Route
                    path={"/profile/:username"}
                    element={<Profile />}
                  />
                </Routes>
              </MemoryRouter>,
            );

            await waitFor(() => {
                const username = screen.getByText(otherProfile.username);
                const bio = screen.getByText(otherProfile.bio);
                const followingCount = screen.getByText(`Following: ${otherProfile.following.length.toString()}`);
                const recipeTitle = screen.getByText(testRecipe.title);
                const recipeAuthor = screen.getByText(testRecipe.author);
                const recipeDesc = screen.getByText(testRecipe.description);

                expect(username).toBeTruthy();
                expect(bio).toBeTruthy();
                expect(followingCount).toBeTruthy();
                expect(recipeTitle).toBeTruthy();
                expect(recipeAuthor).toBeTruthy();
                expect(recipeDesc).toBeTruthy();
            });
        });
    });
});
