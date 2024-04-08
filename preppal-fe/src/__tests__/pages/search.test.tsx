/* eslint-disable no-shadow */
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Search from "../../pages/search";

describe("Search component tests", () => {
    describe("Unit tests", () => {
        test("Render standard component --> headers", async () => {
            const mock = { title: "random search", cookingTime: "50" };
            jest.mock("react-router-dom", () => ({
                ...jest.requireActual("react-router-dom"),
                useParams: () => mock,
            }));

            render(<BrowserRouter><Search /></BrowserRouter>);

            const searchTitle = screen.queryByText("Search");
            const searchFilter = screen.queryByText("Filter");

            expect(searchTitle).toBeTruthy();
            expect(searchFilter).toBeTruthy();
        });
    });
});
