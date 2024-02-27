import { render, screen } from "@testing-library/react";
import LoginPage from "../../pages/profile";
import { BrowserRouter } from 'react-router-dom';

describe('Signup Component tests', () => {
    test('Render standard component --> Buttons', () => {
        render(<BrowserRouter><LoginPage /></BrowserRouter>);

        const loginbtn = screen.queryByTitle("Edit");
        expect(loginbtn).toBeTruthy();
    });
})

