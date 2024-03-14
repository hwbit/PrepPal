const request = require("supertest");
const db = require("../configs/db.ts");
const app = require("../app.ts");
const UserModel = require("../models/user.ts");

describe("userApi test", function () {
    let token;
    const testId = "65e8ec6b354704617272c231";
    const testAccount = "testApiSandboxAccount";
    const testPassword = "lp12asr35Sa45";

    beforeEach(async () => {
        const userApiTestRouter = require("../routes/userApi.ts");

        const response = await request(app)
            .post("/api/auth")
            .send({
                username: testAccount,
                password: testPassword,
            });
        token = response._body.token;
    });

    beforeAll(async () => {
        db.connectDB();
    });
    afterAll(async () => {
        await request(app)
            .post("/api/users/unsaveRecipe")
            .send({ recipeId: "65d03151c3c181f694ab9b8f" })
            .set("x-auth-token", token);
        await request(app)
            .post("/api/users/unfollowUser")
            .send({ username: "test11" })
            .set("x-auth-token", token);
        db.closeDatabase();
    });

    // get list
    it("correct test - getting a list of users", async () => {
        const res = await request(app)
            .get("/api/users");
        expect(res.statusCode).toEqual(200);
    });

    // lookup
    it("correct test - lookup user", async () => {
        const res = await request(app)
            .get(`/api/users/lookup/${testAccount}`);
        expect(res.statusCode).toEqual(200);
    });
    it("incorrect test - lookup user that does not exist", async () => {
        const res = await request(app)
            .get(`/api/users/lookup/${testAccount}${Date.now().toString()}`);
        expect(res.statusCode).toEqual(400);
    });

    // create users
    it("correct test - creating a new user", async () => {
        const tempUserName = `testAccount${Date.now().toString()}`;
        const res = await request(app)
            .post("/api/users/createUser")
            .send({
                username: tempUserName,
                password: "43293taA",
            });
        expect(res.statusCode).toEqual(201);

        // clean up
        await UserModel.deleteOne({ username: tempUserName });
    });

    it("incorrect createUser test - empty string for username", async () => {
        const res = await request(app)
            .post("/api/users/createUser")
            .send({
                username: "",
                password: "43293taA",
            });
        expect(res.statusCode).toEqual(400);
    });

    it("incorrect createUser test - empty string for password", async () => {
        const res = await request(app)
            .post("/api/users/createUser")
            .send({
                username: `testAccount${Date.now().toString()}`,
                password: "",
            });
        expect(res.statusCode).toEqual(400);
    });

    it("incorrect createUser test - not enough characters for password", async () => {
        const res = await request(app)
            .post("/api/users/createUser")
            .send({
                username: `testAccount${Date.now().toString()}`,
                password: "1234",
            });
        expect(res.statusCode).toEqual(400);
    });

    // test update users
    it("correct updateUser test - updating an existing user", async () => {
        const newBio = `This is my new bio! ${Date.now().toString()}`;
        const res = await request(app)
            .post("/api/users/updateUser")
            .send({
                _id: testId,
                username: testAccount,
                password: testPassword,
                bio: newBio,
                ownRecipes: [],
                savedRecipes: [],
                following: [],
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body._id).toEqual(testId);
        expect(res.body.username).toEqual(testAccount);
        expect(res.body.bio).toEqual(newBio);
    });

    it("incorrect updateUser test - invalid userid", async () => {
        const res = await request(app)
            .post("/api/users/updateUser")
            .send({
                _id: "111111111111111111111111",
                username: testAccount,
                password: testPassword,
                bio: "This is my new bio!",
                ownRecipes: [],
                savedRecipes: [],
                following: [],
            });
        expect(res.statusCode).toEqual(400);
    });

    it("incorrect updateUser test - no username", async () => {
        const res = await request(app)
            .post("/api/users/updateUser")
            .send({
                _id: testId,
                username: "",
                password: testPassword,
                bio: "This is my new bio!",
                ownRecipes: [],
                savedRecipes: [],
                following: [],
            });
        expect(res.statusCode).toEqual(400);
    });

    it("incorrect updateUser test - user does not exist", async () => {
        const res = await request(app)
            .post("/api/users/updateUser")
            .send({
                _id: testId,
                username: testAccount + Date.now().toString(),
                password: testPassword,
                bio: "This is my new bio!",
                ownRecipes: [],
                savedRecipes: [],
                following: [],
            });
        expect(res.statusCode).toEqual(400);
    });

    it("incorrect updateUser test - no password", async () => {
        const res = await request(app)
            .post("/api/users/updateUser")
            .send({
                _id: testId,
                username: testAccount,
                password: "",
                bio: "updateUser test - no password",
                ownRecipes: [],
                savedRecipes: [],
                following: [],
            });
        expect(res.statusCode).toEqual(400);
    });

    it("incorrect updateUser test - not enough characters for password", async () => {
        const res = await request(app)
            .post("/api/users/updateUser")
            .send({
                _id: testId,
                username: testAccount,
                password: "1234",
                bio: "updateUser test - not enough characters",
                ownRecipes: [],
                savedRecipes: [],
                following: [],
            });
        expect(res.statusCode).toEqual(400);
    });

    //test saving recipes
    it("correct savedRecipes test - get saved recipes", async () => {
        const res = await request(app)
            .get("/api/users/savedRecipes")
            .set("x-auth-token", token);

        expect(res.statusCode).toEqual(200);
    });

    it("correct ownRecipes test - get own recipes", async () => {
        const res = await request(app)
            .get("/api/users/savedRecipes")
            .set("x-auth-token", token);

        expect(res.statusCode).toEqual(200);
    });

    it("correct saveRecipe test - save recipeId", async () => {
        const res = await request(app)
            .post("/api/users/saveRecipe")
            .send({ recipeId: "65d03151c3c181f694ab9b8f" })
            .set("x-auth-token", token);
        expect(res.statusCode).toEqual(200);
        expect(res._body.recipes).toBeTruthy();
        expect(res._body.recipes).toContain("65d03151c3c181f694ab9b8f");
    });

    it("correct saveRecipe test - recipeId should not be saved twice", async () => {
        let res = await request(app)
            .post("/api/users/saveRecipe")
            .send({ recipeId: "65d03151c3c181f694ab9b8f" })
            .set("x-auth-token", token);
        expect(res.statusCode).toEqual(200);
        const numRecipes = res._body.recipes.length;

        res = await request(app)
            .post("/api/users/saveRecipe")
            .send({ recipeId: "65d03151c3c181f694ab9b8f" })
            .set("x-auth-token", token);

        expect(res.statusCode).toEqual(200);
        expect(res._body.recipes).toBeTruthy();
        expect(res._body.recipes.length).toBe(numRecipes);
        expect(res._body.recipes).toContain("65d03151c3c181f694ab9b8f");
    });

    it("correct unsaveRecipe test - unsave recipeId", async () => {
        let res = await request(app)
            .post("/api/users/saveRecipe")
            .send({ recipeId: "65d03151c3c181f694ab9b8f" })
            .set("x-auth-token", token);
        expect(res._body.recipes).toContain("65d03151c3c181f694ab9b8f");
        res = await request(app)
            .post("/api/users/unsaveRecipe")
            .send({ recipeId: "65d03151c3c181f694ab9b8f" })
            .set("x-auth-token", token);

        expect(res.statusCode).toEqual(200);
        expect(res._body.recipes).toBeTruthy();
        expect(res._body.recipes).not.toContain("65d03151c3c181f694ab9b8f");
    });

    it("correct unsaveRecipe test - unsave recipeId that is not there should be safe", async () => {
        const res = await request(app)
            .post("/api/users/unsaveRecipe")
            .send({ recipeId: "random-id" })
            .set("x-auth-token", token);

        expect(res.statusCode).toEqual(200);
        expect(res._body.recipes).toBeTruthy();
        expect(res._body.recipes).not.toContain("random-id");
    });

    it("correct saveRecipeStatus test - should return true when recipeId is saved", async () => {
        let res = await request(app)
            .post("/api/users/saveRecipe")
            .send({ recipeId: "65d03151c3c181f694ab9b8f" })
            .set("x-auth-token", token);
        expect(res._body.recipes).toContain("65d03151c3c181f694ab9b8f");

        res = await request(app)
            .post("/api/users/saveRecipeStatus")
            .send({ recipeId: "65d03151c3c181f694ab9b8f" })
            .set("x-auth-token", token);

        expect(res.statusCode).toEqual(200);
        expect(res._body.status).toBe(true);
    });

    it("correct saveRecipeStatus test - should return false when recipeId is not saved", async () => {
        const res = await request(app)
            .post("/api/users/saveRecipeStatus")
            .send({ recipeId: "random-id" })
            .set("x-auth-token", token);

        expect(res.statusCode).toEqual(200);
        expect(res._body.status).toBe(false);
    });

    //follow users
    it("correct followUser test - follow user", async () => {
        const res = await request(app)
            .post("/api/users/followUser")
            .send({ username: "test11" })
            .set("x-auth-token", token);

        expect(res.statusCode).toEqual(200);
        expect(res._body.following).toBeTruthy();
        expect(res._body.following).toContain("test11");
    });

    it("correct followUser test - user should not be followed twice", async () => {
        let res = await request(app)
            .post("/api/users/followUser")
            .send({ username: "test11" })
            .set("x-auth-token", token);
        const numFollowing = res._body.following.length;

        res = await request(app)
            .post("/api/users/followUser")
            .send({ username: "test11" })
            .set("x-auth-token", token);

        expect(res.statusCode).toEqual(200);
        expect(res._body.following).toBeTruthy();
        expect(res._body.following).toContain("test11");
        expect(res._body.following.length).toBe(numFollowing);
    });

    it("correct followUser test - handle username that doesn't exist", async () => {
        const res = await request(app)
            .post("/api/users/unfollowUser")
            .send({ username: "random-username" })
            .set("x-auth-token", token);

        expect(res.statusCode).toEqual(200);
        expect(res._body.following).toBeTruthy();
        expect(res._body.following).not.toContain("random-username");
    });

    it("correct followStatus test - should return true when user is followed", async () => {
        let res = await request(app)
            .post("/api/users/followingStatus")
            .send({ username: "test11" })
            .set("x-auth-token", token);

        expect(res.statusCode).toEqual(200);
        expect(res._body.status).toBe(true);
    });

    it("correct followStatus test - should return false when user is not followed", async () => {
        const res = await request(app)
            .post("/api/users/followingStatus")
            .send({ username: "random-username" })
            .set("x-auth-token", token);

        expect(res.statusCode).toEqual(200);
        expect(res._body.status).toBe(false);
    });

    it("correct unfollowUser test - unfollow user", async () => {
        let res = await request(app)
            .post("/api/users/followUser")
            .send({ username: "test11" })
            .set("x-auth-token", token);
        expect(res._body.following).toContain("test11");

        res = await request(app)
            .post("/api/users/unfollowUser")
            .send({ username: "test11" })
            .set("x-auth-token", token);

        expect(res.statusCode).toEqual(200);
        expect(res._body.following).toBeTruthy();
        expect(res._body.following).not.toContain("test11");
    });

    it("correct unfollowUser test - handle username that doesn't exist", async () => {
        const res = await request(app)
            .post("/api/users/unfollowUser")
            .send({ username: "random-username" })
            .set("x-auth-token", token);

        expect(res.statusCode).toEqual(200);
        expect(res._body.following).toBeTruthy();
        expect(res._body.following).not.toContain("random-username");
    });

});
