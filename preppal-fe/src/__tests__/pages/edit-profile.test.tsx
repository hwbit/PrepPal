import { render, screen } from "@testing-library/react";
import EditProfile from "../../pages/edit-profile";
import { BrowserRouter } from 'react-router-dom';

describe('EditProfile component tests', () => {

    describe("Unit tests", () => {
        test('Render standard component --> Buttons', () => {
            render(<BrowserRouter><EditProfile /></BrowserRouter>);

            const submitUpdate = screen.queryByTitle("SubmitUpdate");
            expect(submitUpdate).toBeTruthy();
        });

        test('Render standard component --> Input fields', () => {
            render(<BrowserRouter><EditProfile /></BrowserRouter>);

            const oldPassword = screen.queryByTitle("inputOldPassword");
            expect(oldPassword).toBeTruthy();
            const newPassword = screen.queryByTitle("inputNewPassword");
            expect(newPassword).toBeTruthy();
            const bio = screen.queryByTitle("inputBio");
            expect(bio).toBeTruthy();
        });
    });
});
