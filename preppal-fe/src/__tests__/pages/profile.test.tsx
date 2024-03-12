import { render, screen } from "@testing-library/react";
import ProfilePage from "../../pages/profile";
import { BrowserRouter } from 'react-router-dom';

describe('Profile Component tests', () => {
    test('Render standard component --> Input fields', () => {
        render(<BrowserRouter><ProfilePage /></BrowserRouter>);

        const bio = screen.queryByText("Bio");
        expect(bio).toBeTruthy();
        const recipes = screen.queryByText("Recipes");
        expect(recipes).toBeTruthy();
        const following = screen.queryByText("Following: 0");
        expect(following).toBeTruthy();
    });
})

