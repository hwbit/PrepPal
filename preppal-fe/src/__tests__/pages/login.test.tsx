/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable no-shadow */
import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Login from "../../pages/login";
import { BrowserRouter } from "react-router-dom";
import { mockFetch } from "../../test-utils/mock-fetch";
import NavBar from "../../components/nav-bar/nav-bar";

describe("Login Component tests", () => {
    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(jest.fn());
    });

    afterEach(() => {
        sessionStorage.removeItem("token");
    });

    describe("Unit tests", () => {
        test("Render standard component --> Buttons", () => {
            render(<BrowserRouter><Login /></BrowserRouter>);

            const loginBtn = screen.queryByTitle("login-button");
            const signupLink = screen.queryByTitle("signup-link");

            expect(loginBtn).toBeTruthy();
            expect(signupLink).toBeTruthy();
        });

        test("Render standard component --> input fields", () => {
            render(<BrowserRouter><Login /></BrowserRouter>);

            const username = screen.queryByTitle("username");
            expect(username).toBeTruthy();
            const password = screen.queryByTitle("password");
            expect(password).toBeTruthy();
        });
    });

    describe("Integration tests", () => {
        const testAccount = "testApiSandboxAccount";
        const testPassword = "lp12asr35Sa45";
        test("Successful login in updates the navigation bar display", async () => {
            render(<BrowserRouter><Login /></BrowserRouter>);
            window.fetch = mockFetch({ token: "random-token" });
            expect(screen.queryByTitle("profile-link")).toBeFalsy();
            expect(screen.queryByTitle("collections-link")).toBeFalsy();

            const username = screen.getByPlaceholderText("Username");
            const password = screen.getByPlaceholderText("Password");
            const loginButton = screen.getByTitle("login-button");

            fireEvent.change(username, { target: { value: testAccount } });
            fireEvent.change(password, { target: { value: testPassword } });
            await act(() => fireEvent.submit(loginButton));

            await act(() => render(<BrowserRouter><NavBar /></BrowserRouter>));

            const profileLink = screen.getByTitle("profile-link");
            const collectionsLink = screen.getByTitle("collections-link");

            expect(profileLink).toBeTruthy();
            expect(collectionsLink).toBeTruthy();
        });

        test("Failed login in does not update the navigation bar display", async () => {
            render(<BrowserRouter><Login /></BrowserRouter>);
            window.fetch = mockFetch({ token: "undefined" });

            const username = screen.getByPlaceholderText("Username");
            const password = screen.getByPlaceholderText("Password");
            const loginButton = screen.getByTitle("login-button");

            fireEvent.change(username, { target: { value: "no user" } });
            fireEvent.change(password, { target: { value: "incorrect password" } });
            await act(() => fireEvent.submit(loginButton));

            const loginLink = screen.getByTitle("login-link");

            expect(loginLink).toBeTruthy();
            expect(screen.queryByTitle("profile-link")).toBeFalsy();
            expect(screen.queryByTitle("collections-link")).toBeFalsy();
        });
    });
});
