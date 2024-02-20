import { render, screen } from "@testing-library/react";
import LoginPage from "../../pages/signup";
import { BrowserRouter } from 'react-router-dom';

describe('Signup Component tests', () => {
    test('Render standard component --> Buttons', () => {
        render(<BrowserRouter><LoginPage /></BrowserRouter>);

        const loginbtn = screen.queryByTitle("SignUp");
        expect(loginbtn).toBeTruthy();
    });

    test('Render standard component --> input fields', () => {
        render(<BrowserRouter><LoginPage /></BrowserRouter>);

        const username = screen.queryByTitle("inputUsername");
        expect(username).toBeTruthy();
        const password = screen.queryByTitle("inputPassword");
        expect(password).toBeTruthy();
    });
})

