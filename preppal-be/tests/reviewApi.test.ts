/* eslint-disable no-magic-numbers */
const request = require("supertest");
const db = require("../configs/db.ts");
const app = require("../app.ts");
const ReviewModel = require("../models/review.ts");
const RecipeModel = require("../models/recipe.ts");

describe("recipeApi test", function() {
    const testRecipeId = "65d03133c3c181f694ab9b8b"; // test recipe 1000 - do not delete
    const testAuthor = "testApiSandboxAccount";
    const testRecipeTitle = "tempRecipeWillDelete";

    const testPostRecipeId = "65d03151c3c181f694ab9b8f"; // test recipe 2000 - do not delete - will reset this after use

    beforeEach(function() {
        const reviewApiTestRouter = require("../routes/reviewApi.ts");
    });
    beforeAll(function() {
        db.connectDB();
    });
    afterAll(function() {
        db.closeDatabase();
    });

    // get list
    it("correct test - getting a list of reviews", async () => {
        const res = await request(app)
            .get("/api/reviews");
        expect(res.statusCode).toEqual(200);
    });

    // get a review
    it("correct test - lookup a review", async () => {
        const res = await request(app)
            .get(`/api/reviews/${testRecipeId}`);
        expect(res.statusCode).toEqual(200);
    });
    it("incorrect test - lookup recipe that does not exist", async () => {
        const res = await request(app)
            .get("/api/reviews/111111111111111111111111");
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual("Cannot create an entry for a review for a recipe that does not exist");
    });


    // init a new review
    it("correct test - init recipe review", async () => {
        const recipe = await new RecipeModel({
            author: testAuthor,
            title: testRecipeTitle,
            titleUrl: "test-recipe-1234",
            ingredients: ["1"],
            instructions: ["1"],
            servingSize: 1,
            prepTime: 1,
            cookingTime: 1,
            isPublic: false,
        });
        await recipe.save();

        const recipeId = recipe._id.toString();

        const res = await request(app)
            .get(`/api/reviews/new/${recipeId}`);
        expect(res.statusCode).toEqual(201);
        expect(res.body.newReview.recipeId).toEqual(recipeId);

        // clean up
        await ReviewModel.deleteOne({ recipeId: recipeId });
        await RecipeModel.deleteOne({ _id: recipeId });
    });

    it("incorrect test - init recipe that already has been init", async () => {
        const res = await request(app)
            .get(`/api/reviews/new/${testRecipeId}`);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({});
    });

    it("incorrect test - init recipe that does not exist", async () => {
        const res = await request(app)
            .get("/api/reviews/new/111111111111111111111111");
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({});
    });


    // post review
    it("correct test - post review with no reviews", async () => {
        // init
        const testTitle = `Test Title - ${Date.now().toString()}`;
        const testComment = `This is a test comment - ${Date.now().toString()}`;

        const res = await request(app)
            .post("/api/reviews/post/")
            .send({
                recipeId: testPostRecipeId,
                author: "testApiSandboxAccount",
                rating: "5",
                title: testTitle,
                comment: testComment,
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.updatedRecipeReview.recipeId).toEqual(testPostRecipeId);
        expect(res.body.updatedRecipeReview.reviews[0].author).toEqual(testAuthor);
        expect(res.body.updatedRecipeReview.reviews[0].rating).toEqual(5);
        expect(res.body.updatedRecipeReview.reviews[0].title).toEqual(testTitle);
        expect(res.body.updatedRecipeReview.reviews[0].comment).toEqual(testComment);

        // clean up - delete comments by "emptying" array
        await ReviewModel.findOneAndUpdate({ recipeId: testPostRecipeId }, { reviews: [] });
    });

    it("correct test - post review with review already present", async () => {
        const firstRating = 1;
        const firstTitle = "This is the first post title";
        const firstComment = "This is the first post comment";
        const secondRating = 5;
        const secondTitle = "This is the second post title";
        const secondComment = "This is the second post comment";

        // first post
        await request(app)
            .post("/api/reviews/post/")
            .send({
                recipeId: testPostRecipeId,
                author: testAuthor,
                rating: firstRating,
                title: firstTitle,
                comment: firstComment,
            });

        // second post
        const res = await request(app)
            .post("/api/reviews/post/")
            .send({
                recipeId: testPostRecipeId,
                author: testAuthor,
                rating: secondRating,
                title: secondTitle,
                comment: secondComment,
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.updatedRecipeReview.recipeId).toEqual(testPostRecipeId);
        expect(res.body.updatedRecipeReview.reviews[0].author).toEqual(testAuthor);
        expect(res.body.updatedRecipeReview.reviews[0].rating).toEqual(secondRating);
        expect(res.body.updatedRecipeReview.reviews[0].title).toEqual(secondTitle);
        expect(res.body.updatedRecipeReview.reviews[0].comment).toEqual(secondComment);

        expect(res.body.updatedRecipeReview.reviews[1].author).toEqual(testAuthor);
        expect(res.body.updatedRecipeReview.reviews[1].rating).toEqual(firstRating);
        expect(res.body.updatedRecipeReview.reviews[1].title).toEqual(firstTitle);
        expect(res.body.updatedRecipeReview.reviews[1].comment).toEqual(firstComment);

        // clean up - delete comments by "emptying" array
        await ReviewModel.findOneAndUpdate({ recipeId: testPostRecipeId }, { reviews: [] });
    });


    it("incorrect test - post review no author", async () => {
        const testTitle = `Test Title - ${Date.now().toString()}`;
        const testComment = `This is a test comment - ${Date.now().toString()}`;

        const res = await request(app)
            .post("/api/reviews/post/")
            .send({
                recipeId: testPostRecipeId,
                author: "",
                rating: "5",
                title: testTitle,
                comment: testComment,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - post review no title", async () => {
        const testComment = `This is a test comment - ${Date.now().toString()}`;

        const res = await request(app)
            .post("/api/reviews/post/")
            .send({
                recipeId: testPostRecipeId,
                author: testAuthor,
                rating: "5",
                title: "",
                comment: testComment,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - post review no rating", async () => {
        const testTitle = `Test Title - ${Date.now().toString()}`;
        const testComment = `This is a test comment - ${Date.now().toString()}`;

        const res = await request(app)
            .post("/api/reviews/post/")
            .send({
                recipeId: testPostRecipeId,
                author: testAuthor,
                rating: "",
                title: testTitle,
                comment: testComment,
            });
        expect(res.statusCode).toEqual(400);
    });
});
