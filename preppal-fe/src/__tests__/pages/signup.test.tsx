import { render } from "@testing-library/react";
import LoginPage from "../../pages/signup";
import { BrowserRouter } from 'react-router-dom';

describe('Signup Component tests', () => {
    test('Render standard component --> Buttons', () => {
        const { queryByTitle } = render(<BrowserRouter><LoginPage /></BrowserRouter>);

        const loginbtn = queryByTitle("SignUp");
        expect(loginbtn).toBeTruthy();
    });

    test('Render standard component --> input fields', () => {
        const { queryByTitle } = render(<BrowserRouter><LoginPage /></BrowserRouter>);

        const username = queryByTitle("inputUsername");
        expect(username).toBeTruthy();
        const password = queryByTitle("inputPassword");
        expect(password).toBeTruthy();
    });
})

