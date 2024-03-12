const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const date = new Date().toString();

const CalendarSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    calendarDates: [
        {
            dateIs: {
                type: Number,
            },
            recipeOfTheDayID: {
                type: String
            },
            recipeOfTheDayTitle: {
                type: String
            },
            recipeOfTheDayIngredients: {
                type: String
            }
        }
    ]});

module.exports = mongoose.model("RecipeCalendar", CalendarSchema);
