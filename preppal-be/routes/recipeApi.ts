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
        res.status(200).json(recipes);
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
        res.status(200).json(recipe);
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
        res.status(200).json(recipes);
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
        const { title } = req.body
        // collation makes the lookup case insensitive
        // https://www.mongodb.com/docs/manual/reference/collation/ 
        const recipes = await Recipe.find({ title: title })
                                .collation({ locale: 'en', strength: 2 });
        res.status(200).json(recipes);
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
        const { author, title, description, image, ingredients, instructions, servingSize, prepTime, cookingTime } = req.body;

        if (!author) {
            return res.status(400).json({ msg: "Recipe requires an author." });
        } else if (!title) {
            return res.status(400).json({ msg: "Recipe requires a title." });
        }

        const titleUrl = title.toLowerCase().replaceAll(" ", "-");
        const recipe = await new Recipe({ author, title, titleUrl, description, image, ingredients, instructions, servingSize, prepTime, cookingTime });

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
        const { _id, author, title, description, image, ingredients, instructions, servingSize, prepTime, cookingTime, creationDate, tags, visibility } = req.body;
        
        const verifyRecipe = await Recipe.findOne({ _id: _id });

        if (!verifyRecipe) {
            return res.status(400).json({ errors: [{ msg: "Invalid Id for recipe."}] });
        } else if (!author) {
            return res.status(400).json({ msg: "Recipe requires an author." });
        } else if (!title) {
            return res.status(400).json({ msg: "Recipe requires a title." });
        }

        const modifiedDate = new Date().toString();
        const titleUrl = title.toLowerCase().replaceAll(" ", "-");
        const recipe = await new Recipe({ _id, author, title, titleUrl, image, description, ingredients, instructions, servingSize, prepTime, cookingTime, creationDate, modifiedDate, tags, visibility });
        const newRecipe = await Recipe.findOneAndUpdate({ _id: _id }, recipe);

        if (!newRecipe) {
            return res.status(404).json({ msg: "Recipe was not found." });
        }

        res.status(201).json({ recipe });
    } catch (error) {
        console.error(error);
        res.status(500).send("Could not update recipe.");
    }
});

/**
 * DELETE - Delete recipe
 */
routerRecipeApi.delete("/deleteRecipe/:id", async (req, res) => {
    try {
        // remove the recipe from the author's list
        const recipeId = req.params.id;
        const recipe = await Recipe.findOne({ _id: recipeId });
        const { _id, username, password, bio, ownRecipes, savedRecipes, following } = await Author.findOne({ username: recipe.author });
        if (!username) {
            return res.status(400).json({ msg: "Could not find author of recipe." });
        }

        // removes the item from the author's list
        const index = ownRecipes.indexOf(recipeId, 0)
        if (index > -1) {
            ownRecipes.splice(index, 1);
        }

        const update = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                '_id': _id, 
                'username':  username, 
                'password': password, 
                'bio': bio, 
                'ownRecipes': ownRecipes, 
                'savedRecipes': savedRecipes, 
                'following': following
            })
        };
        // update the user array
        await fetch("http://localhost:9001/api/users/updateUsers", update);

        // delete the recipe
        await Recipe.deleteOne({ _id: req.params.id });
        res.status(200).json({ msg: "Recipe Deleted" });
    } catch(err) {
        res.status(500).send("Could not find recipe.");
    }
});

module.exports = routerRecipeApi;