import { UUID } from "mongodb";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    recipeId: {
        type: UUID,
        required: UUID.generate()
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    ingredients: {
        type: Array,
        required: true
    },
    instructions: {
        type: Array,
        required: true
    },
    servingSize: {
        type: Number,
        required: true
    },
    prepTime: {
        type: Number,
        required: true
    },
    cookingTime: {
        type: Number,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    modifiedDate: {
        type: Date
    }
})

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;