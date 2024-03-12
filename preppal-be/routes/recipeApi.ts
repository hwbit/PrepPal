/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
const expressRecipeApi = require("express");
// const configRecipeApi = require("../configs/secrets.ts");
const Recipe = require("../models/recipe.ts");
const Author = require("../models/user.ts");

const routerRecipeApi = expressRecipeApi.Router();

/**
 * GET - Get all public recipes
 */
routerRecipeApi.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        const publicRecipes = recipes?.filter((recipe) => recipe.isPublic) ?? [];
        res.status(200).json(publicRecipes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server error.");
    }
});

/**
 * GET - GET recipe by id
 */
routerRecipeApi.get("/lookupId/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id });

        if (!recipe) {
            return res.status(400).json({ errors: [ { msg: "Invalid id for recipe." } ] });
        }

        res.status(200).json(recipe);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Could not find id.");
    }
});

/**
 * GET - Get all public recipes by author
 */
routerRecipeApi.get("/lookupAuthor/:author", async (req, res) => {
    try {
        const recipes = await Recipe.find({ author: req.params.author });
        const publicRecipes = recipes?.filter((recipe) => recipe.isPublic) ?? [];
        res.status(200).json(publicRecipes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Could not look up author.");
    }
});

/**
 * POST - Get all recipes with the name
 * Useful for SEARCH since recipe title might have spaces
 */
routerRecipeApi.post("/searchName/", async (req, res) => {
    try {
        const { title } = req.body;
        // collation makes the lookup case insensitive
        // https://www.mongodb.com/docs/manual/reference/collation/
        const recipes = await Recipe.find({ title: { $regex: new RegExp(title, "i") } })
            .collation({ locale: "en", strength: 2 });
        const publicRecipes = recipes.filter((recipe) => recipe.isPublic);
        res.status(200).json(publicRecipes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Could not look up name.");
    }
});

/**
 * POST - Get all recipes with all the received filter values
 * Useful for ADVANCED SEARCH
 */
routerRecipeApi.post("/searchRecipes", async (req, res) => {
    try {
        const { title, author, description, ingredients, cookingTime, publicOnly } = req.body;

        const query = {};
        // @ts-expect-error any
        if (author) query.author = author;
        // @ts-expect-error any
        if (title) query.title = { $regex: new RegExp(title, "i") }; // Case-insensitive title search
        // @ts-expect-error any
        if (description) query.description = { $regex: new RegExp(description, "i") }; // Case-insensitive description search
        if (ingredients) {
            const ingredientRegexPatterns = ingredients.map((ingredient) => new RegExp(ingredient, "i"));
            // @ts-expect-error any
            query.ingredients = { $all: ingredientRegexPatterns };
        }
        // @ts-expect-error any
        if (cookingTime) query.cookingTime = { $lte: cookingTime }; // cooking time less than or equal to the specified value
        // @ts-expect-error any
        if (publicOnly) query.isPublic = publicOnly; // if publicOnly, filter for public recipes, if not publicOnly, don't filter by visibility

        const recipes = await Recipe.find(query);
        res.status(200).json(recipes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Could not look up name.");
    }
});

/**
 * POST - Create recipe
 */
routerRecipeApi.post("/createRecipe", async (req, res) => {
    try {
        const {
            author,
            title,
            description,
            image,
            ingredients,
            instructions,
            servingSize,
            prepTime,
            cookingTime,
            isPublic,
        }
            = req.body;

        if (!author) {
            return res.status(400).json({ msg: "Recipe requires an author." });
        }
        else if (!title) {
            return res.status(400).json({ msg: "Recipe requires a title." });
        }
        else if (!ingredients || ingredients.length === 0 || !instructions || instructions.length === 0) {
            return res.status(400).json({ msg: "Recipe requires a ingredients and/or instructions." });
        }
        else if (!servingSize || servingSize <= 0) {
            return res.status(400).json({ msg: "Recipe requires a serving size." });
        }
        else if (!prepTime || prepTime < 0 || !cookingTime || cookingTime < 0) {
            return res.status(400).json({ msg: "Recipe requires a prep time and/or cooking time." });
        }

        const titleUrl = title.toLowerCase().replaceAll(" ", "-");
        const recipe = await new Recipe({
            author,
            title,
            titleUrl,
            description,
            image,
            ingredients,
            instructions,
            servingSize,
            prepTime,
            cookingTime,
            isPublic,
        });

        // add recipe to the author's array
        const user = await Author.findOne({ username: author });
        const ownRecipes = user.ownRecipes;
        ownRecipes.push(recipe.id);
        // const updatedUser = await Author.findByIdAndUpdate(user.id, { ownRecipes });

        const newRecipe = await recipe.save();
        res.status(201).json({ newRecipe });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Could not create recipe.");
    }
});

/**
 * POST - Update recipe
 */
routerRecipeApi.post("/updateRecipe", async (req, res) => {
    try {
        const {
            _id,
            author,
            title,
            description,
            image,
            ingredients,
            instructions,
            servingSize,
            prepTime,
            cookingTime,
            creationDate,
            tags,
            isPublic,
        }
            = req.body;

        const verifyRecipe = await Recipe.findOne({ _id });

        if (!verifyRecipe) {
            return res.status(400).json({ errors: [ { msg: "Invalid id for recipe." } ] });
        }
        else if (!author) {
            return res.status(400).json({ msg: "Recipe requires an author." });
        }
        else if (!title) {
            return res.status(400).json({ msg: "Recipe requires a title." });
        }
        else if (!ingredients || ingredients.length === 0 || !instructions || instructions.length === 0) {
            return res.status(400).json({ msg: "Recipe requires a ingredients and/or instructions." });
        }
        else if (!servingSize || servingSize <= 0) {
            return res.status(400).json({ msg: "Recipe requires a serving size." });
        }
        else if (!prepTime || prepTime < 0 || !cookingTime || cookingTime < 0) {
            return res.status(400).json({ msg: "Recipe requires a prep time and/or cooking time." });
        }

        const modifiedDate = new Date().toString();
        const titleUrl = title.toLowerCase().replaceAll(" ", "-");
        const recipe = await new Recipe({
            _id,
            author,
            title,
            titleUrl,
            image,
            description,
            ingredients,
            instructions,
            servingSize,
            prepTime,
            cookingTime,
            creationDate,
            modifiedDate,
            tags,
            isPublic,
        });
        const newRecipe = await Recipe.findOneAndUpdate({ _id }, recipe);

        if (!newRecipe) {
            return res.status(404).json({ msg: "Recipe was not found." });
        }

        res.status(201).json({ recipe });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Could not update recipe.");
    }
});

/**
 * DELETE - Delete recipe
 */
routerRecipeApi["delete"]("/deleteRecipe/:id", async (req, res) => {
    try {
        // remove the recipe from the author's list
        const recipeId = req.params.id;
        const recipe = await Recipe.findOne({ _id: recipeId });
        const { _id, username, password, bio, ownRecipes, savedRecipes, following } = await Author.findOne({ username: recipe.author });

        if (!username) {
            return res.status(400).json({ msg: "Could not find author of recipe." });
        }

        // removes the item from the author's list
        const index = ownRecipes.indexOf(recipeId, 0);
        if (index > -1) {
            ownRecipes.splice(index, 1);
        }

        // update the author's json
        await Author.findByIdAndUpdate(_id, { ownRecipes });

        // delete the recipe
        await Recipe.deleteOne({ _id: req.params.id });
        res.status(200).json({ msg: "Recipe Deleted" });
    }
    catch (err) {
        res.status(500).send("Could not find recipe.");
    }
});

module.exports = routerRecipeApi;
