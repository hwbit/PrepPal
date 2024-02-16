const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const date = new Date().toString();

const RecipeSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    // TODO: Use this for URL address encoding
    titleUrl: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        default: '../assets/logo.png'
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
    },
    tags: {
        type: Array
    },
    visibility: {
        type: String
    }
})

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;