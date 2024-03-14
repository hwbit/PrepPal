const request = require("supertest");
const db = require("../configs/db.ts");
const app = require("../app.ts");

describe("userApi test", function() {
    const testAccount = "testApiSandboxAccount";
    const testDNEUsername = "testDNEUsername";

    const dateIs = "2024-03-22";
    const recipeOfTheDayID = "test";
    const recipeOfTheDayTitle = "test";
    const recipeOfTheDayIngredients = "test";

    beforeEach(async () => {
    });

    beforeAll(async () => {
        db.connectDB();
    });
    afterAll(async () => {
        db.closeDatabase();
    });

    // get calendar
    it("correct test - getting a users' calendar", async () => {
        const res = await request(app)
            .post("/api/calendar/getCalendar")
            .send({username: testAccount});
        expect(res.statusCode).toEqual(200);
    });

    // get calendar
    it("fail test - getting a users' calendar", async () => {
        const res = await request(app)
            .post("/api/calendar/getCalendar")
            .send({anythingButUsername: testAccount});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual("Username required");
    });

    // update calendar
    it("correct test - updating a users' calendar", async () => {
        const res = await request(app)
            .post("/api/calendar/updateCalendar")
            .send({
                username: testAccount,
                dateIs: dateIs,
                recipeOfTheDayID: recipeOfTheDayID,
                recipeOfTheDayTitle: recipeOfTheDayTitle,
                recipeOfTheDayIngredients: recipeOfTheDayIngredients,
            });
        expect(res.statusCode).toEqual(201);
    });

    // update calendar
    it("correct test - updating a users' calendar with missing parts", async () => {
        const dateIs = "2024-03-22";
        const res = await request(app)
            .post("/api/calendar/updateCalendar")
            .send({
                username: testAccount,
                dateIs: dateIs,
            });
        expect(res.statusCode).toEqual(201);
    });

    // update calendar
    it("fail test - updating a users' calendar without user", async () => {
        const res = await request(app)
            .post("/api/calendar/updateCalendar")
            .send({
                dateIs: dateIs,
                recipeOfTheDayID: recipeOfTheDayID,
                recipeOfTheDayTitle: recipeOfTheDayTitle,
                recipeOfTheDayIngredients: recipeOfTheDayIngredients,
            });
        expect(res.statusCode).toEqual(400);
    });

    // update calendar
    it("correct test - updating a users' calendar without date", async () => {
        const res = await request(app)
            .post("/api/calendar/updateCalendar")
            .send({
                username: testAccount,
                recipeOfTheDayID: recipeOfTheDayID,
                recipeOfTheDayTitle: recipeOfTheDayTitle,
                recipeOfTheDayIngredients: recipeOfTheDayIngredients,
            });
        expect(res.statusCode).toEqual(400);
    });

    // update calendar
    it("fail test - updating a users' calendar without calendar", async () => {
        const res = await request(app)
            .post("/api/calendar/updateCalendar")
            .send({
                username: testDNEUsername,
                dateIs: dateIs,
                recipeOfTheDayID: recipeOfTheDayID,
                recipeOfTheDayTitle: recipeOfTheDayTitle,
                recipeOfTheDayIngredients: recipeOfTheDayIngredients,
            });
        expect(res.statusCode).toEqual(400);
    });

    // get calendar
    it("success test - getting a users' calendar that has updated", async () => {
        const res = await request(app)
            .post("/api/calendar/getCalendar")
            .send({username: testAccount});
        expect(res.statusCode).toEqual(200);
        const index = res.body.calendarDates.findIndex((calDate) => calDate.dateIs === dateIs);
        expect(index > -1);
        expect(res.body.calendarDates[index].recipeOfTheDayID === recipeOfTheDayID);
        expect(res.body.calendarDates[index].recipeOfTheDayTitle === recipeOfTheDayTitle);
        expect(res.body.calendarDates[index].recipeOfTheDayIngredients === recipeOfTheDayIngredients);
        const indexInvalid = res.body.calendarDates.findIndex((calDate) => calDate.dateIs === "1900-12-12");
        expect(indexInvalid === 1);
    });
});
