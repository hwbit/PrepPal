import { render, screen } from "@testing-library/react";
import SignupPage from "../../pages/signup";
import { BrowserRouter } from 'react-router-dom';

describe('Signup Component tests', () => {
    test('Render standard component --> Buttons', () => {
        render(<BrowserRouter><SignupPage /></BrowserRouter>);

        const loginbtn = screen.queryByTitle("SignUp");
        expect(loginbtn).toBeTruthy();
    });

    test('Render standard component --> input fields', () => {
        render(<BrowserRouter><SignupPage /></BrowserRouter>);

        const username = screen.queryByTitle("inputUsername");
        expect(username).toBeTruthy();
        const password = screen.queryByTitle("inputPassword");
        expect(password).toBeTruthy();
    });
})

