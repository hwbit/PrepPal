import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import Search from "../../pages/search";

describe('Search tests', () => {
    test('Render standard component --> headers', async () => {
        render(<BrowserRouter><Search /></BrowserRouter>);
        const searchQuery = screen.queryByText("Search query: ");
        const searchResult = screen.queryByText("Search Results");

        expect(searchResult).toBeTruthy();
        expect(searchQuery).toBeTruthy();
    });

})
