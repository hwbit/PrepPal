const expressReviewApi = require("express");
const Review = require("../models/review.ts");
const Author = require("../models/user.ts");
const Recipe = require("../models/recipe.ts");

const routerReviewApi = expressReviewApi.Router();


/**
 * GET - Get all reviews
 */
routerReviewApi.get("/", async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server error.");
    }
});

/**
 * GET - Get reviews by recipeId
 */
routerReviewApi.get("/:recipeId", async (req, res) => {
    try {
        let reviews = await Review.findOne({ recipeId: req.params.recipeId });

        if (!reviews) {
            const recipe = await Recipe.findOne({_id: req.params.recipeId });
            if (!recipe) {
                return res.status(400).json("Cannot create an entry for a review for a recipe that does not exist");
            }

            reviews = await new Review({ recipeId: req.params.recipeId });
            await reviews.save();
        }

        res.status(200).json(reviews);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server error.");
    }
});

/**
 * POST - Add a review/comment to a recipe
 */
routerReviewApi.post("/post", async (req, res) => {
    try {
        const {
            recipeId,
            author,
            rating,
            title,
            comment,
        }
            = req.body;

        if (!author) {
            return res.status(400).json({ msg: "Comment requires an author." });
        }
        else if (!rating) {
            return res.status(400).json({ msg: "Comment requires a rating." });
        }
        else if (!title) {
            return res.status(400).json({ msg: "Comment requires a title." });
        }

        const recipeReview = await Review.findOne({ recipeId });
        const authorReview = await Author.findOne({ username: author });

        if (!recipeReview) {
            return res.status(400).json({ errors: [ { msg: "Invalid Id for recipe." } ] });
        }
        else if (!authorReview) {
            return res.status(400).json({ errors: [ { msg: "Invalid id for author." } ] });
        }

        const reviews = await recipeReview.reviews;

        const date = new Date().toString();
        const review = {
            author,
            rating,
            title,
            comment,
            date,
        };

        // adds item to the front of the array and update
        // this is to get the comments to show up in reverse chronological order (most recent at the top)
        await reviews.unshift(review);
        await Review.findByIdAndUpdate(recipeReview.id, { reviews });

        const updatedRecipeReview = await Review.findOne({ recipeId });

        if (!updatedRecipeReview) {
            // eslint-disable-next-line no-magic-numbers
            return res.status(404).json({ msg: "Unable to update recipe." });
        }

        res.status(201).json({ updatedRecipeReview });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server error.");
    }
});

module.exports = routerReviewApi;
