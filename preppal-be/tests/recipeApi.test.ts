const request = require("supertest");
const db = require("../configs/db.ts");
const app = require("../app.ts");
const RecipeModel = require("../models/recipe.ts");
const AuthorModel = require("../models/user.ts");

describe("recipeApi test", function() {
    const testRecipeId = "65d03133c3c181f694ab9b8b"; // test recipe 1000 - do not delete
    const testAuthor = "testApiSandboxAccount";

    const testUpdateRecipeId = "65d03151c3c181f694ab9b8f";
    const testUpdateRecipeTitle = "Test Recipe 2000";

    beforeEach(function() {
        const recipeApiTestRouter = require("../routes/recipeApi.ts");
    });
    beforeAll(function() {
        db.connectDB();
    });
    afterAll(function() {
        db.closeDatabase();
    });

    // get list
    it("correct test - getting a list of recipes", async () => {
        const res = await request(app)
            .get("/api/recipes");
        expect(res.statusCode).toEqual(200);
    });

    // lookup
    it("correct test - lookup a recipe", async () => {
        const res = await request(app)
            .get(`/api/recipes/lookupId/${testRecipeId}`);
        expect(res.statusCode).toEqual(200);
    });
    it("incorrect test - lookup recipe that does not exist", async () => {
        const res = await request(app)
            .get("/api/recipes/lookupId/111111111111111111111111");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeNull();
    });

    // lookup author
    it("correct test - lookup a recipe", async () => {
        const res = await request(app)
            .get(`/api/recipes/lookupAuthor/${testAuthor}`);
        expect(res.statusCode).toEqual(200);
    });
    it("incorrect test - lookup recipe that does not exist", async () => {
        const res = await request(app)
            .get(`/api/recipes/lookupAuthor/${testAuthor}${Date.now().toString()}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    });

    // search recipe name
    it("correct test - lookup a valid recipe", async () => {
        const res = await request(app)
            .post("/api/recipes/searchName")
            .send({title: "tesT rEcIpE 1000"});
        expect(res.statusCode).toEqual(200);
        expect(res.body[0].author).toEqual(testAuthor);
        expect(res.body[0].description).toEqual("Test Recipe - DO NOT DELETE");
        expect(res.body[0].ingredients[0]).toEqual("item1");
        expect(res.body[0].ingredients[1]).toEqual("item2");
        expect(res.body[0].ingredients[2]).toEqual("item3");
        expect(res.body[0].instructions[0]).toEqual("step1");
        expect(res.body[0].instructions[1]).toEqual("step2");
        expect(res.body[0].instructions[2]).toEqual("step3");
        expect(res.body[0].servingSize).toEqual(2);
        expect(res.body[0].prepTime).toEqual(10);
        expect(res.body[0].cookingTime).toEqual(10);
    });

    it("incorrect test - lookup a recipe that does not exist", async () => {
        const res = await request(app)
            .post("/api/recipes/searchName")
            .send({title: `tesT rEcIpE${Date.now().toString()}`});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    });

    // create recipe
    it("correct test - create a new recipe", async () => {
        const testRecipeTitle = `Test Recipe ${Date.now().toString()}`;
        const res = await request(app)
            .post("/api/recipes/createRecipe")
            .send({
                author: testAuthor,
                title: testRecipeTitle,
                description: "Testing createRecipe API call",
                ingredients: ["item1", "item2", "item3"],
                instructions: ["step1", "step2", "step3"],
                servingSize: 2,
                prepTime: 10,
                cookingTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.newRecipe.author).toEqual(testAuthor);
        expect(res.body.newRecipe.title).toEqual(testRecipeTitle);
        expect(res.body.newRecipe.description).toEqual("Testing createRecipe API call");
        expect(res.body.newRecipe.ingredients[0]).toEqual("item1");
        expect(res.body.newRecipe.ingredients[1]).toEqual("item2");
        expect(res.body.newRecipe.ingredients[2]).toEqual("item3");
        expect(res.body.newRecipe.instructions[0]).toEqual("step1");
        expect(res.body.newRecipe.instructions[1]).toEqual("step2");
        expect(res.body.newRecipe.instructions[2]).toEqual("step3");
        expect(res.body.newRecipe.servingSize).toEqual(2);
        expect(res.body.newRecipe.prepTime).toEqual(10);
        expect(res.body.newRecipe.cookingTime).toEqual(10);

        // clean up
        const recipeId = res.body.newRecipe._id;
        const { _id, username, password, bio, ownRecipes, savedRecipes, following } = await AuthorModel.findOne({ username: testAuthor });

        // removes the item from the author's list
        const index = ownRecipes.indexOf(recipeId, 0);
        if (index > -1) {
            ownRecipes.splice(index, 1);
        }

        const user = await new AuthorModel({ _id, username, password, bio, ownRecipes, savedRecipes, following });
        await AuthorModel.findOneAndUpdate({ username: username }, user);
        await RecipeModel.findOneAndDelete({ _id: recipeId });
    });
    it("incorrect test - create a new recipe with no author", async () => {
        const testRecipeTitle = `Test Recipe ${Date.now().toString()}`;
        const res = await request(app)
            .post("/api/recipes/createRecipe")
            .send({
                author: "",
                title: testRecipeTitle,
                description: "Testing createRecipe API call",
                ingredients: ["item1", "item2", "item3"],
                instructions: ["step1", "step2", "step3"],
                servingSize: 2,
                prepTime: 10,
                cookingTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - create a new recipe with no title", async () => {
        const res = await request(app)
            .post("/api/recipes/createRecipe")
            .send({
                author: testAuthor,
                title: "",
                description: "Testing createRecipe API call",
                ingredients: ["item1", "item2", "item3"],
                instructions: ["step1", "step2", "step3"],
                servingSize: 2,
                prepTime: 10,
                cookingTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - create a new recipe with no ingredients", async () => {
        const res = await request(app)
            .post("/api/recipes/createRecipe")
            .send({
                author: testAuthor,
                title: "create recipe",
                description: "Testing createRecipe API call",
                ingredients: [],
                instructions: ["step1", "step2", "step3"],
                servingSize: 2,
                prepTime: 10,
                cookingTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - create a new recipe with no instructions", async () => {
        const res = await request(app)
            .post("/api/recipes/createRecipe")
            .send({
                author: testAuthor,
                title: "create recipe",
                description: "Testing createRecipe API call",
                ingredients: ["item1", "item2", "item3"],
                instructions: [],
                servingSize: 2,
                prepTime: 10,
                cookingTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - create a new recipe with no serving size", async () => {
        const res = await request(app)
            .post("/api/recipes/createRecipe")
            .send({
                author: testAuthor,
                title: "create recipe",
                description: "Testing createRecipe API call",
                ingredients: ["item1", "item2", "item3"],
                instructions: ["step1", "step2", "step3"],
                prepTime: 10,
                cookingTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - create a new recipe with negative serving size", async () => {
        const res = await request(app)
            .post("/api/recipes/createRecipe")
            .send({
                author: testAuthor,
                title: "create recipe",
                description: "Testing createRecipe API call",
                ingredients: ["item1", "item2", "item3"],
                instructions: ["step1", "step2", "step3"],
                servingSize: -1,
                prepTime: 10,
                cookingTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - create a new recipe with no prep time", async () => {
        const res = await request(app)
            .post("/api/recipes/createRecipe")
            .send({
                author: testAuthor,
                title: "create recipe",
                description: "Testing createRecipe API call",
                ingredients: ["item1", "item2", "item3"],
                instructions: ["step1", "step2", "step3"],
                servingSize: 2,
                cookingTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - create a new recipe with negative prep time", async () => {
        const res = await request(app)
            .post("/api/recipes/createRecipe")
            .send({
                author: testAuthor,
                title: "create recipe",
                description: "Testing createRecipe API call",
                ingredients: ["item1", "item2", "item3"],
                instructions: ["step1", "step2", "step3"],
                servingSize: 2,
                prepTime: -1,
                cookingTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - create a new recipe with no cooking time", async () => {
        const res = await request(app)
            .post("/api/recipes/createRecipe")
            .send({
                author: testAuthor,
                title: "create recipe",
                description: "Testing createRecipe API call",
                ingredients: ["item1", "item2", "item3"],
                instructions: ["step1", "step2", "step3"],
                servingSize: 2,
                prepTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - create a new recipe with negative cooking time", async () => {
        const res = await request(app)
            .post("/api/recipes/createRecipe")
            .send({
                author: testAuthor,
                title: "create recipe",
                description: "Testing createRecipe API call",
                ingredients: ["item1", "item2", "item3"],
                instructions: ["step1", "step2", "step3"],
                servingSize: 2,
                prepTime: 10,
                cookingTime: -1,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });

    // updateRecipe
    it("correct test - create a update recipe", async () => {
        const testUpdateRecipeDesc = `Test Recipe To Update - DO NOT DELETE ${Date.now().toString()}`;
        const res = await request(app)
            .post("/api/recipes/updateRecipe")
            .send({
                _id: testUpdateRecipeId,
                author: testAuthor,
                title: testUpdateRecipeTitle,
                description: testUpdateRecipeDesc,
                ingredients: ["item1", "item2", "item3"],
                instructions: ["step1", "step2", "step3"],
                servingSize: 2,
                prepTime: 10,
                cookingTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.recipe._id).toEqual(testUpdateRecipeId);
        expect(res.body.recipe.author).toEqual(testAuthor);
        expect(res.body.recipe.title).toEqual(testUpdateRecipeTitle);
        expect(res.body.recipe.description).toEqual(testUpdateRecipeDesc);
        expect(res.body.recipe.ingredients[0]).toEqual("item1");
        expect(res.body.recipe.ingredients[1]).toEqual("item2");
        expect(res.body.recipe.ingredients[2]).toEqual("item3");
        expect(res.body.recipe.instructions[0]).toEqual("step1");
        expect(res.body.recipe.instructions[1]).toEqual("step2");
        expect(res.body.recipe.instructions[2]).toEqual("step3");
        expect(res.body.recipe.servingSize).toEqual(2);
        expect(res.body.recipe.prepTime).toEqual(10);
        expect(res.body.recipe.cookingTime).toEqual(10);
    });
    it("incorrect test - update recipe with no author", async () => {
        const testRecipeTitle = `Test Recipe ${Date.now().toString()}`;
        const res = await request(app)
            .post("/api/recipes/updateRecipe")
            .send({
                _id: testRecipeId,
                author: "",
                title: "update recipe",
                description: "Testing updateRecipe API call - should fail",
                ingredients: ["item1", "item2", "item3"],
                instructions: ["step1", "step2", "step3"],
                servingSize: 2,
                prepTime: 10,
                cookingTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - update recipe with no title", async () => {
        const res = await request(app)
            .post("/api/recipes/updateRecipe")
            .send({
                _id: testRecipeId,
                author: testAuthor,
                title: "",
                description: "Testing updateRecipe API call - should fail",
                ingredients: ["item1", "item2", "item3"],
                instructions: ["step1", "step2", "step3"],
                servingSize: 2,
                prepTime: 10,
                cookingTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - update new recipe with no ingredients", async () => {
        const res = await request(app)
            .post("/api/recipes/updateRecipe")
            .send({
                _id: testRecipeId,
                author: testAuthor,
                title: "update recipe",
                description: "Testing updateRecipe API call - should fail",
                ingredients: [],
                instructions: ["step1", "step2", "step3"],
                servingSize: 2,
                prepTime: 10,
                cookingTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - update new recipe with no instructions", async () => {
        const res = await request(app)
            .post("/api/recipes/updateRecipe")
            .send({
                _id: testRecipeId,
                author: testAuthor,
                title: "update recipe",
                description: "Testing updateRecipe API call - should fail",
                ingredients: ["item1", "item2", "item3"],
                instructions: [],
                servingSize: 2,
                prepTime: 10,
                cookingTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - update recipe with no serving size", async () => {
        const res = await request(app)
            .post("/api/recipes/updateRecipe")
            .send({
                _id: testRecipeId,
                author: testAuthor,
                title: "update recipe",
                description: "Testing updateRecipe API call - should fail",
                ingredients: ["item1", "item2", "item3"],
                instructions: ["step1", "step2", "step3"],
                prepTime: 10,
                cookingTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - update new recipe with negative serving size", async () => {
        const res = await request(app)
            .post("/api/recipes/updateRecipe")
            .send({
                _id: testRecipeId,
                author: testAuthor,
                title: "update recipe",
                description: "Testing updateRecipe API call - should fail",
                ingredients: ["item1", "item2", "item3"],
                instructions: ["step1", "step2", "step3"],
                servingSize: -1,
                prepTime: 10,
                cookingTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - update new recipe with no prep time", async () => {
        const res = await request(app)
            .post("/api/recipes/updateRecipe")
            .send({
                _id: testRecipeId,
                author: testAuthor,
                title: "update recipe",
                description: "Testing updateRecipe API call - should fail",
                ingredients: ["item1", "item2", "item3"],
                instructions: ["step1", "step2", "step3"],
                servingSize: 2,
                cookingTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - update new recipe with negative prep time", async () => {
        const res = await request(app)
            .post("/api/recipes/updateRecipe")
            .send({
                _id: testRecipeId,
                author: testAuthor,
                title: "update recipe",
                description: "Testing updateRecipe API call - should fail",
                ingredients: ["item1", "item2", "item3"],
                instructions: ["step1", "step2", "step3"],
                servingSize: 2,
                prepTime: -1,
                cookingTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - update new recipe with no cooking time", async () => {
        const res = await request(app)
            .post("/api/recipes/updateRecipe")
            .send({
                _id: testRecipeId,
                author: testAuthor,
                title: "update recipe",
                description: "Testing updateRecipe API call - should fail",
                ingredients: ["item1", "item2", "item3"],
                instructions: ["step1", "step2", "step3"],
                servingSize: 2,
                prepTime: 10,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });
    it("incorrect test - update new recipe with negative cooking time", async () => {
        const res = await request(app)
            .post("/api/recipes/updateRecipe")
            .send({
                _id: testRecipeId,
                author: testAuthor,
                title: "update recipe",
                description: "Testing updateRecipe API call - should fail",
                ingredients: ["item1", "item2", "item3"],
                instructions: ["step1", "step2", "step3"],
                servingSize: 2,
                prepTime: 10,
                cookingTime: -1,
                isPublic: true,
            });
        expect(res.statusCode).toEqual(400);
    });

    // deleteRecipe/:id
    it("correct test - delete recipe", async () => {
        // create recipe to delete
        const testRecipeTitle = `Test Recipe ${Date.now().toString()}`;
        const recipe = await new RecipeModel({
            author: testAuthor,
            title: testRecipeTitle,
            titleUrl: "test-recipe-1234",
            ingredients: ["1"],
            instructions: ["1"],
            servingSize: 1,
            prepTime: 1,
            cookingTime: 1,
            isPublic: true,
        });
        await recipe.save();

        const res = await request(app)
            ["delete"](`/api/recipes/deleteRecipe/${recipe._id.toString()}`);
        expect(res.statusCode).toEqual(200);
    });
    it("incorrect test - delete recipe bad id", async () => {
        // create recipe to delete
        const res = await request(app)
            ["delete"]("/api/recipes/deleteRecipe/111111111111111111111111");
        expect(res.statusCode).toEqual(500);
    });
});
