import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import Search from "../../pages/search";

describe('Search tests', () => {
    test('Render standard component --> headers', async () => {
        const mock = { query: "random search" };
        jest.mock("react-router-dom", () => ({
            ...jest.requireActual("react-router-dom"),
            useParams: () => mock,
        }));

        render(<BrowserRouter><Search /></BrowserRouter>);

        const searchResult = screen.queryByText("Search Results");
        const searchQuery = screen.queryByText("Search query: ");

        expect(searchResult).toBeTruthy();
        expect(searchQuery).toBeTruthy();
    });
})
