import { render } from "@testing-library/react";
import LoginPage from "../../pages/login";
import { BrowserRouter } from 'react-router-dom';

describe('Login Component tests', () => {
    test('Render standard component --> Buttons', () => {
        const { queryByTitle } = render(<BrowserRouter><LoginPage /></BrowserRouter>);

        const loginbtn = queryByTitle("Login");
        expect(loginbtn).toBeTruthy();
    });

    test('Render standard component --> input fields', () => {
        const { queryByTitle } = render(<BrowserRouter><LoginPage /></BrowserRouter>);

        const username = queryByTitle("inputUsername");
        expect(username).toBeTruthy();
        const password = queryByTitle("inputPassword");
        expect(password).toBeTruthy();
        const checkboxRemember = queryByTitle("checkboxRememberMe");
        expect(checkboxRemember).toBeTruthy();
    });
})

