import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import Recipe from "../../pages/recipe";

describe('Recipe tests', () => {
    test('Render standard component --> headers', async () => {
        render(<BrowserRouter><Recipe /></BrowserRouter>);
        const author = screen.queryByText("Author:");
        expect(author).toBeTruthy();
        const ingredients = screen.queryByText("Ingredients");
        expect(ingredients).toBeTruthy();
        const instructions = screen.queryByText("Instructions");
        expect(instructions).toBeTruthy();
        const servings = screen.queryByText("Serving Size:");
        expect(servings).toBeTruthy();
    });

    test('Render standard component --> reviews', async () => {
        render(<BrowserRouter><Recipe /></BrowserRouter>);

        const leaveReview = screen.queryByText("Leave a review");
        expect(leaveReview).toBeTruthy();
        const reviews = screen.queryByText("Reviews");
        expect(reviews).toBeTruthy();
    });
})
