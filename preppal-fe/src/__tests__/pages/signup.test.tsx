import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import Signup from "../../pages/signup";

describe('Signup component tests', () => {
    test('Render standard component --> Buttons', () => {
        render(<BrowserRouter><Signup /></BrowserRouter>);

        const signupBtn = screen.queryByTitle("SignUp");
        expect(signupBtn).toBeTruthy();
    });

    test('Render standard component --> input fields', () => {
        render(<BrowserRouter><Signup /></BrowserRouter>);

        const username = screen.queryByTitle("inputUsername");
        expect(username).toBeTruthy();
        const password = screen.queryByTitle("inputPassword");
        expect(password).toBeTruthy();
    });
})

