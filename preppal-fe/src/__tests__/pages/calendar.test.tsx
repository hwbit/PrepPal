import { render, screen } from "@testing-library/react";
import CalendarPage from "../../pages/recipe-calendar";
import { BrowserRouter } from 'react-router-dom';

describe('Calendar Component tests', () => {
    test('Render standard component --> Input fields', () => {
        render(<BrowserRouter><CalendarPage /></BrowserRouter>);

        const calendarButton = screen.queryByTitle("SubmitCalendarUpdate");
        expect(calendarButton).toBeTruthy();
    });
})

