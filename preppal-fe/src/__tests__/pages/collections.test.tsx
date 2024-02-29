import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Collections from "../../pages/collections";

describe("Collections page tests", () => {
  test("Render standard component --> Buttons", async () => {
    render(<BrowserRouter><Collections /></BrowserRouter>);

    const myRecipesBtn = screen.queryByText("My Recipes");
    const favouritesBtn = screen.queryByText("Favourites");

    expect(myRecipesBtn).toBeTruthy();
    expect(favouritesBtn).toBeTruthy();
  });
});

