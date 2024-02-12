const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const date = new Date().toString();

const RecipeSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    recipeTitle: {
        type: String,
        required: true
    },
    recipeTitleUrl: {
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
        default: date
    },
    modifiedDate: {
        type: Date
    }
})

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;