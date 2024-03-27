const expressUserApi = require("express");
const routerUserApi = expressUserApi.Router();
const jwtUserApi = require("jsonwebtoken");
const configUserApi = require("../configs/secrets.ts");
const auth = require("../auth/authorization.ts");
const User = require("../models/user.ts");
const Recipe = require("../models/recipe.ts");
const Uploader = require("../utils/uploader.ts");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

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
    try {
        const username = req.params.username;
        const user = await User.findOne({ username }).select("-password");

        if (!user) {
            return res.status(400).json({ errors: [ { msg: "Invalid id for user." } ] });
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
            image: user.image,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
});


/**
 * POST - Create a user
 */
routerUserApi.post("/createUser", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password || password.length < PWD_LENGTH) {
            return res.status(400).json({ errors: [ { msg: "Invalid username and/or password." } ] });
        }
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ errors: [ { msg: "Username already exists." } ] });
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
routerUserApi.post("/updateUser", upload.single("imageRaw"), async (req, res) => {
    try {
        const { _id, username, password, bio } = req.body;

        let image = process.env.DEFAULT_LOGO_URL;

        const verifyUser = await User.findOne({ _id, username });

        if (!verifyUser) {
            return res.status(400).json({ errors: [ { msg: "Invalid id for user." } ] });
        }

        if (!username || !password || password.length < PWD_LENGTH) {
            return res.status(400).json({ errors: [ { msg: "Invalid username and/or password." } ] });
        }

        let user;

        if (req.file) {
            image = await Uploader.uploadImage(req.file, username);
            user = await User.findOneAndUpdate({ _id }, { bio, password, image }, { new: true });
        }
        else {
            user = await User.findOneAndUpdate({ _id }, { bio, password }, { new: true });
        }

        if (!user) {
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
            return res.status(400).json({ errors: [ { msg: "Invalid token." } ] });
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
            return res.status(400).json({ errors: [ { msg: "Invalid token." } ] });
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
            return res.status(400).json({ errors: [ { msg: "Invalid token." } ] });
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
 * POST - get user's savedRecipes
 */
routerUserApi.post("/savedRecipes", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        const { title, author, description, ingredients, cookingTime } = req.body;

        if (!user) {
            return res.status(400).json({ errors: [ { msg: "Invalid token." } ] });
        }

        const query = {};
        // @ts-expect-error any
        if (author) query.author = author;
        // @ts-expect-error any
        if (title) query.title = { $regex: new RegExp(title, "i") }; // Case-insensitive title search
        // @ts-expect-error any
        if (description) query.description = { $regex: new RegExp(description, "i") }; // Case-insensitive description search
        if (typeof ingredients === "object") {
            const ingredientRegexPatterns = ingredients.map((ingredient) => new RegExp(ingredient, "i"));
            // @ts-expect-error any
            query.ingredients = { $all: ingredientRegexPatterns };
        }
        // @ts-expect-error any
        if (cookingTime) query.cookingTime = { $lte: cookingTime }; // cooking time less than or equal to the specified value


        const result = await User.findOne({ _id: req.user.id });
        const recipeIds = result?.savedRecipes ?? [];
        const recipes = [];
        for (const recipeId of recipeIds) {
            query._id = recipeId;
            const recipe = await Recipe.find(query);
            if (recipe[0]) {
                recipes.push(recipe[0]);
            }
        }
        res.status(200).json(recipes);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
});

/**
 * POST - get user's ownRecipes
 */
routerUserApi.post("/ownRecipes", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        const { title, author, description, ingredients, cookingTime } = req.body;

        if (!user) {
            return res.status(400).json({ errors: [ { msg: "Invalid token." } ] });
        }

        const query = {};
        // @ts-expect-error any
        if (author) query.author = author;
        // @ts-expect-error any
        if (title) query.title = { $regex: new RegExp(title, "i") }; // Case-insensitive title search
        // @ts-expect-error any
        if (description) query.description = { $regex: new RegExp(description, "i") }; // Case-insensitive description search
        if (typeof ingredients === "object") {
            const ingredientRegexPatterns = ingredients.map((ingredient) => new RegExp(ingredient, "i"));
            // @ts-expect-error any
            query.ingredients = { $all: ingredientRegexPatterns };
        }
        // @ts-expect-error any
        if (cookingTime) query.cookingTime = { $lte: cookingTime }; // cooking time less than or equal to the specified value


        const result = await User.findOne({ _id: req.user.id });
        const recipeIds = result?.ownRecipes ?? [];
        const recipes = [];
        for (const recipeId of recipeIds) {
            query._id = recipeId;
            const recipe = await Recipe.find(query);
            if (recipe[0]) {
                recipes.push(recipe[0]);
            }
        }
        res.status(200).json(recipes);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
});

/**
 * POST - Add a user to the logged in user's following list
 */
routerUserApi.post("/followUser", auth, async (req, res) => {
    try {
        const { username } = req.body;

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(400).json({ errors: [ { msg: "Invalid token." } ] });
        }

        let following = user.following;
        if (following.includes(username)) {
            return res.status(200).json({ following });
        }

        const result = await User.findOneAndUpdate({ _id: req.user.id }, { $push: { following: username } }, { new: true });
        following = result?.following;
        res.status(200).json({ following });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
});

/**
 * POST - Remove a user from the logged in user's following list
 */
routerUserApi.post("/unfollowUser", auth, async (req, res) => {
    try {
        const { username } = req.body;

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(400).json({ errors: [ { msg: "Invalid token." } ] });
        }

        let following = user.following;
        if (!following.includes(username)) {
            return res.status(200).json({ following });
        }

        const result = await User.findOneAndUpdate({ _id: req.user.id }, { $pull: { following: username } }, { new: true });
        following = result?.following ?? [];
        res.status(200).json({ following });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
});

/**
 * GET - Check if a user is followed by the logged in user or not
 */
routerUserApi.post("/followingStatus", auth, async (req, res) => {
    try {
        const { username } = req.body;

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(400).json({ errors: [ { msg: "Invalid token." } ] });
        }
        const result = await User.find({ _id: req.user.id, following: username });

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

module.exports = routerUserApi;
