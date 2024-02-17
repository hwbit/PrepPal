const request = require('supertest');
const db = require('../configs/db.ts');
const app = require('../app.ts');
const UserModel = require('../models/user.ts');

describe('userApi test', function() {
    const testId = "65d030c7c3c181f694ab9b85";
    const testAccount = "testApiSandboxAccount";
    const testPassword = "lp12asr35Sa45";
    
    beforeEach(function() {
        const userApiTestRouter = require('../routes/userApi.ts');
    });
    beforeAll(function() {
        db.connectDB();
    });
    afterAll(function() {
        db.closeDatabase();
    });

    // get list
    it("correct test - getting a list of users", async() => {
        const res = await request(app)
            .get("/api/users");
        expect(res.statusCode).toEqual(200);
    });

    // lookup
    it("correct test - lookup user", async() => {
        const res = await request(app)
            .get("/api/users/lookup/"+testAccount);
        expect(res.statusCode).toEqual(200);
    });
    it("incorrect test - lookup user that does not exist", async() => {
        const res = await request(app)
            .get("/api/users/lookup/" + testAccount + Date.now().toString());
        expect(res.statusCode).toEqual(200);
        // body returns an empty array
        expect(res.body.user).toEqual([]);
    });

    // create users
    it("correct test - creating a new user", async() => {
        const tempUserName = "testAccount" + Date.now().toString();
        const res = await request(app)
            .post("/api/users/createUsers")
            .send({
                username: tempUserName,
                password: "43293taA"
            });
        expect(res.statusCode).toEqual(200);

        // clean up
        await UserModel.findOneAndDelete({ username: tempUserName });
    });
    it("incorrect createUser test - empty string for username", async() => {
        const res = await request(app)
            .post("/api/users/createUsers")
            .send({
                username: "",
                password: "43293taA"
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect createUser test - empty string for password", async() => {
        const res = await request(app)
            .post("/api/users/createUsers")
            .send({
                username: "testAccount"+ Date.now().toString(),
                password: ""
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect createUser test - not enough characters for password", async() => {
        const res = await request(app)
            .post("/api/users/createUsers")
            .send({
                username: "testAccount" + Date.now().toString(),
                password: "1234"
            });
        expect(res.statusCode).toEqual(400);
    });


    // test update users
    it("correct updateUser test - updating an existing user", async() => {
        const newBio = "This is my new bio! " + Date.now().toString();
        const res = await request(app)
            .post("/api/users/updateUsers")
            .send({
                _id: testId,
                username: testAccount,
                password: testPassword,
                bio: newBio, 
                ownRecipes: [], 
                savedRecipes: [], 
                following: []
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body._id).toEqual(testId);
        expect(res.body.username).toEqual(testAccount);
        expect(res.body.bio).toEqual(newBio);
    });
    it("incorrect updateUser test - invalid userid", async() => {
        const res = await request(app)
            .post("/api/users/updateUsers")
            .send({
                _id: "111111111111111111111111",
                username: testAccount,
                password: testPassword,
                bio: "This is my new bio!", 
                ownRecipes: [], 
                savedRecipes: [], 
                following: []
            })
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect updateUser test - no username", async() => {
        const res = await request(app)
            .post("/api/users/updateUsers")
            .send({
                _id: testId,
                username: "",
                password: testPassword,
                bio: "This is my new bio!", 
                ownRecipes: [], 
                savedRecipes: [], 
                following: []
            })
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect updateUser test - user does not exist", async() => {
        const res = await request(app)
            .post("/api/users/updateUsers")
            .send({
                _id: testId,
                username: testAccount + Date.now().toString(),
                password: testPassword,
                bio: "This is my new bio!", 
                ownRecipes: [], 
                savedRecipes: [], 
                following: []
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect updateUser test - no password", async() => {
        const res = await request(app)
            .post("/api/users/updateUsers")
            .send({
                _id: testId,
                username: testAccount,
                password: "",
                bio: "updateUser test - no password", 
                ownRecipes: [], 
                savedRecipes: [], 
                following: []
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect updateUser test - not enough characters for password", async() => {
        const res = await request(app)
            .post("/api/users/updateUsers")
            .send({
                _id: testId,
                username: testAccount,
                password: "1234",
                bio: "updateUser test - not enough characters", 
                ownRecipes: [], 
                savedRecipes: [], 
                following: []
            });
        expect(res.statusCode).toEqual(400);
    });



});