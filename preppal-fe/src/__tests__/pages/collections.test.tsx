import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import Collections from "../../pages/collections";

describe('Collections page tests', () => {
    test('Render standard component --> Buttons', async () => {
        const result = '{"username":"testApiSandboxAccount","password":"lp12asr35Sa45@$"}';
        await localStorage.setItem("token", JSON.stringify(result));
        render(<BrowserRouter><Collections /></BrowserRouter>);

        const myRecipesBtn = screen.queryByTitle("My Recipes");
        const favouritesBtn = screen.queryByTitle("Favourites");

        expect(myRecipesBtn).toBeTruthy();
        expect(favouritesBtn).toBeTruthy();
    });
})

