/* eslint-disable testing-library/no-unnecessary-act */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import Signup from "../../pages/signup";
import { mockFetch } from "../mock-fetch";
import NavBar from "../../components/nav-bar/nav-bar";

describe('Signup component tests', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
    });

    afterEach(() => {
        sessionStorage.removeItem('token');
    });

    describe("Unit tests", () => {
        test('Render standard component --> Buttons', () => {
            render(<BrowserRouter><Signup /></BrowserRouter>);

            const signupBtn = screen.queryByTitle("signup-button");
            expect(signupBtn).toBeTruthy();
        });

        test('Render standard component --> input fields', () => {
            render(<BrowserRouter><Signup /></BrowserRouter>);

            const username = screen.queryByTitle("username");
            expect(username).toBeTruthy();
            const password = screen.queryByTitle("password");
            expect(password).toBeTruthy();
        });
    });

    describe("Integration tests", () => {
        test('Successful signup updates the navigation bar display', async () => {
            render(<BrowserRouter><Signup /></BrowserRouter>);
            window.fetch = mockFetch({ "token": "random-token" });
            expect(screen.queryByTitle('profile-link')).toBeFalsy();
            expect(screen.queryByTitle('collections-link')).toBeFalsy();

            const username = screen.getByPlaceholderText('Username');
            const password = screen.getByPlaceholderText('Password');
            const signupButton = screen.getByTitle('signup-button');

            fireEvent.change(username, { target: { value: "passing user" } });
            fireEvent.change(password, { target: { value: "passing pass" } });
            await act(() => fireEvent.submit(signupButton));

            await act(() => render(<BrowserRouter><NavBar /></BrowserRouter>));

            const profileLink = screen.getByTitle('profile-link');
            const collectionsLink = screen.getByTitle('collections-link');

            expect(profileLink).toBeTruthy();
            expect(collectionsLink).toBeTruthy();
        });

        test('Failed signup does not update the navigation bar display', async () => {
            render(<BrowserRouter><Signup /></BrowserRouter>);
            window.fetch = mockFetch({ "token": "undefined" });

            const username = screen.getByPlaceholderText('Username');
            const password = screen.getByPlaceholderText('Password');
            const signupButton = screen.getByTitle('signup-button');

            fireEvent.change(username, { target: { value: 'no user' } });
            fireEvent.change(password, { target: { value: 'incorrect password' } });
            await act(() => fireEvent.submit(signupButton));

            const loginLink = screen.getByTitle('login-link');

            expect(loginLink).toBeTruthy();
            expect(screen.queryByTitle('profile-link')).toBeFalsy();
            expect(screen.queryByTitle('collections-link')).toBeFalsy();
        });
    });
})

