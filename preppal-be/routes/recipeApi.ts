const expressRecipeApi = require("express");
const routerRecipeApi = expressRecipeApi.Router();
const configRecipeApi = require("../configs/secrets.ts")

const Recipe = require("../models/recipe.ts");
const Author = require("../models/user.ts")

/**
 * GET - Get all recipes
 */
routerRecipeApi.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error.")
    }
});

/**
 * GET - GET recipe by id
 */
routerRecipeApi.get("/lookupId/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id });
        res.json(recipe);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Could not find id.");
    }
});

/**
 * GET - Get all recipes with the URL
 */
routerRecipeApi.get("/lookupAuthor/:author", async (req, res) => {
    try {
        const recipes = await Recipe.find({ author: req.params.author });
        res.json(recipes);
    } catch (error) {
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
        const { recipeName } = req.body
        const recipes = await Recipe.find({ recipeName: recipeName })
                                .collation({ locale: 'en', strength: 2 }); // case insensitive
        res.json(recipes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Could not look up name.");
    }
});


/**
 * POST - Create recipe
 */
routerRecipeApi.post("/createRecipe", async (req, res) => {
    try {
        const { _id, author, recipeTitle, description, ingredients, instructions, servingSize, prepTime, cookingTime } = req.body;
        const recipeTitleUrl = recipeTitle.toLowerCase().replace(" ", "-");
        const recipe = await new Recipe({ author, recipeTitle, recipeTitleUrl, description, ingredients, instructions, servingSize, prepTime, cookingTime });

        // add recipe to the author's array
        const user = await Author.findOne({ username: author });
        const ownRecipes = user.ownRecipes;
        ownRecipes.push(recipe.id);
        const updatedUser = await Author.findByIdAndUpdate(user.id, { ownRecipes: ownRecipes });

        const newRecipe = await recipe.save();
        res.status(201).json({ newRecipe });
    } catch (error) {
        console.error(error);
        res.status(500).send("Could not create recipe.");
    }
});

/**
 * POST - Update recipe
 */
routerRecipeApi.post("/updateRecipe", async (req, res) => {
    try {
        const { _id, author, recipeTitle, recipeTitleUrl, description, ingredients, instructions, servingSize, prepTime, cookingTime, creationDate } = req.body;
        const modifiedDate = new Date().toString();
        const recipe = await new Recipe({ _id, author, recipeTitle, recipeTitleUrl, description, ingredients, instructions, servingSize, prepTime, cookingTime, creationDate, modifiedDate });
        const newRecipe = await Recipe.findOneAndUpdate ( { _id: _id }, recipe);

        if (!newRecipe) {
            return res.status(404).json( { msg:"Recipe was not found." } );
        }

        res.status(201).json({ recipe });
    } catch (error) {
        console.error(error);
        res.status(500).send("Could not update recipe.");
    }
});

module.exports = routerRecipeApi;