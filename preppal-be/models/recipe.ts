import mongoose from "mongoose";

const Schema = mongoose.Schema;

const date = new Date().toString();

const RecipeSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    // TODO: Use this for URL address encoding
    titleUrl: {
        type: String,
        required: true,
    },
    description: {type: String},
    image: {
        type: String,
        default: "logo.png",
    },
    ingredients: {
        type: [String],
        required: true,
    },
    instructions: {
        type: [String],
        required: true,
    },
    servingSize: {
        type: Number,
        required: true,
    },
    prepTime: {
        type: Number,
        required: true,
    },
    cookingTime: {
        type: Number,
        required: true,
    },
    creationDate: {
        type: Date,
        default: date,
    },
    modifiedDate: {type: Date},
    tags: {type: [String]},
    isPublic: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
