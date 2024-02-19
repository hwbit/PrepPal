const request = require('supertest');
const db = require('../configs/db.ts');
const app = require('../app.ts');
const UserModel = require('../models/user.ts');

// this is related to userId
describe('authApi test', function () {
    const testAccount = "testApiSandboxAccount";
    const testPassword = "lp12asr35Sa45";

    beforeEach(function () {
        const authApiTestRouter = require('../routes/authApi.ts');
    });
    beforeAll(function () {
        db.connectDB();
    });
    afterAll(function () {
        db.closeDatabase();
    });

    // get list
    it("correct test - getting a list of users", async () => {
        const res = await request(app)
            .get("/api/auth");
        expect(res.statusCode).toEqual(200);
    });

    // login
    it("correct test - login successful", async() => {
        const res = await request(app)
            .post("/api/auth")
            .send({
                username: testAccount,
                password: testPassword
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.token).toBeTruthy();
    });

    it("incorrect test - user does not exist", async() => {
        const res = await request(app)
            .post("/api/auth")
            .send({
                username: testAccount + Date.now().toString(),
                password: testPassword
            });
        expect(res.statusCode).toEqual(400);
    });

    it("incorrect test - incorrect password", async() => {
        const res = await request(app)
            .post("/api/auth")
            .send({
                username: testAccount,
                password: testPassword + Date.now().toString()
            });
        expect(res.statusCode).toEqual(400);
    });

});
