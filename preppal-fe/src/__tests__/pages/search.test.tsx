import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import Search from "../../pages/search";

describe('Search component tests', () => {

    describe("Unit tests", () => {
        test('Render standard component --> headers', async () => {
            const mock = { title: "random search", cookingTime: "50" };
            jest.mock("react-router-dom", () => ({
                ...jest.requireActual("react-router-dom"),
                useParams: () => mock,
            }));

            render(<BrowserRouter><Search /></BrowserRouter>);

            const searchResult = screen.queryByText("Search");
            const searchQuery = screen.queryByText("Search query:");

            expect(searchResult).toBeTruthy();
            expect(searchQuery).toBeTruthy();
        });
    });
});
