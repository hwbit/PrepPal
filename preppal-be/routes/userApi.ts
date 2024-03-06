const expressUserApi = require("express");
const routerUserApi = expressUserApi.Router();
const jwtUserApi = require("jsonwebtoken");
const configUserApi = require("../configs/secrets.ts");
const auth = require("../auth/authorization.ts");
const User = require("../models/user.ts");
const Recipe = require("../models/recipe.ts");

const SESSION_EXPIRY = 86400;
const PWD_LENGTH = 5;

/**
 * GET - Get all accounts
 */
routerUserApi.get("/", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});


/**
 * GET - Get an account with corresponding username
 */
routerUserApi.get("/lookup/:username", async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({ username }).select("-password");

    if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid id for user." }] });
    }
    const recipeIds = user.ownRecipes ?? [];
    const publicRecipes = [];
    for (const recipeId of recipeIds) {
        const recipe = await Recipe.findOne({ _id: recipeId });
        if (recipe && recipe.isPublic) {
            publicRecipes.push(recipe);
        }
    }

    res.status(200).json({
        username: user.username,
        bio: user.bio,
        following: user.following,
        recipes: publicRecipes,
    });
});


/**
 * POST - Create a user
 */
routerUserApi.post("/createUser", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password || password.length < PWD_LENGTH) {
            return res.status(400).json({ errors: [{ msg: "Invalid username and/or password." }] });
        }
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "Username already exists." }] });
        }

        user = new User({ username, password });
        user.save();

        const payload = { user: { id: user.id } };
        jwtUserApi.sign(payload, configUserApi.jwtSecret, { expiresIn: SESSION_EXPIRY }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ token });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
});


/**
 * POST - Update user
 */
routerUserApi.post("/updateUser", async (req, res) => {
    try {
        const { _id, username, password, bio, ownRecipes, savedRecipes, following } = req.body;

        const verifyUser = await User.findOne({ _id, username });

        if (!verifyUser) {
            return res.status(400).json({ errors: [{ msg: "Invalid id for user." }] });
        }

        if (!username || !password || password.length < PWD_LENGTH) {
            return res.status(400).json({ errors: [{ msg: "Invalid username and/or password." }] });
        }
        const user = await new User({ _id, username, password, bio, ownRecipes, savedRecipes, following });
        const newUser = await User.findOneAndUpdate({ username }, user);

        if (!newUser) {
            return res.status(400).json({ msg: "User was not found" });
        }

        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
});

/**
 * POST - Add recipe to user's savedRecipes
 */
routerUserApi.post("/saveRecipe", auth, async (req, res) => {
    try {
        const { recipeId } = req.body;

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid token." }] });
        }

        let recipes = user.savedRecipes;
        if (recipes.includes(recipeId)) {
            return res.status(200).json({ recipes });
        }

        const result = await User.findOneAndUpdate({ _id: req.user.id }, { $push: { savedRecipes: recipeId } }, { new: true });
        recipes = result?.savedRecipes;
        res.status(200).json({ recipes });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
});

/**
 * POST - Remove recipe from user's savedRecipes
 */
routerUserApi.post("/unsaveRecipe", auth, async (req, res) => {
    try {
        const { recipeId } = req.body;

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid token." }] });
        }

        let recipes = user.savedRecipes;
        if (!recipes.includes(recipeId)) {
            return res.status(200).json({ recipes });
        }

        const result = await User.findOneAndUpdate({ _id: req.user.id }, { $pull: { savedRecipes: recipeId } }, { new: true });
        recipes = result?.savedRecipes ?? [];
        res.status(200).json({ recipes });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
});

/**
 * GET - check if recipe id is in user's savedRecipes
 */
routerUserApi.post("/saveRecipeStatus", auth, async (req, res) => {
    try {
        const { recipeId } = req.body;

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid token." }] });
        }
        const result = await User.find({ _id: req.user.id, savedRecipes: recipeId });

        if (result.length > 0) {
            res.status(200).json({ status: true });
        }
        else {
            res.status(200).json({ status: false });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
});

/**
 * GET - get user's savedRecipes
 */
routerUserApi.get("/savedRecipes", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid token." }] });
        }
        const result = await User.findOne({ _id: req.user.id });
        const recipeIds = result?.savedRecipes ?? [];
        const recipes = [];
        for (const recipeId of recipeIds) {
            const recipe = await Recipe.findOne({ _id: recipeId });
            if (recipe && recipe.isPublic) {
                publicRecipes.push(recipe);
            }
        }
        res.status(200).json(recipes);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
});

module.exports = routerUserApi;
