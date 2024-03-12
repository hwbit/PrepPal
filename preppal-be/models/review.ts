const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const date = new Date().toString();

const ReviewSchema = new Schema({
    recipeId: {
        type: String,
        required: true,
    },
    reviews: [
        {
            author: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            comment: {
                type: String,
            },
            date: {
                type: Date,
                default: date,
            }
        }
    ]});

module.exports = mongoose.model("Reviews", ReviewSchema);
