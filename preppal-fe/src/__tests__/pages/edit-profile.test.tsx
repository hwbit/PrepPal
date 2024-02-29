import { render, screen } from "@testing-library/react";
import LoginPage from "../../pages/edit-profile";
import { BrowserRouter } from "react-router-dom";

describe("Signup Component tests", () => {
  test("Render standard component --> Buttons", () => {
    render(<BrowserRouter><LoginPage /></BrowserRouter>);

    const submitUpdate = screen.queryByTitle("SubmitUpdate");
    expect(submitUpdate).toBeTruthy();
  });

  test("Render standard component --> input fields", () => {
    render(<BrowserRouter><LoginPage /></BrowserRouter>);

    const oldPassword = screen.queryByTitle("inputOldPassword");
    expect(oldPassword).toBeTruthy();
    const newPassword = screen.queryByTitle("inputNewPassword");
    expect(newPassword).toBeTruthy();
    const bio = screen.queryByTitle("inputBio");
    expect(bio).toBeTruthy();
  });
});

