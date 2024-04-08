/* eslint-disable no-magic-numbers */
const expressRecipeApi = require("express");
const Calendar = require("../models/calendar.ts");

const calendarApi = expressRecipeApi.Router();

/**
 * GET - Init the review for a recipe
 * Used to generate a new table in the database
 */
calendarApi.post("/getCalendar", async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json("Username required");
        }

        const thisCalendar = await Calendar.findOne({ username });

        // (new user)If user does not have a calendar, create and return
        if (!thisCalendar) {
            const newCalendar = await new Calendar({
                username: username,
                calendarDates: [],
            });
            const userCalendar = await newCalendar.save();
            res.status(200).json(userCalendar);
        }
        // (returning user) return the matching user's calendar
        else {
            res.status(200).json(thisCalendar);
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server error was: ");
    }
});

/**
 * POST - update recipe-of-the-day, for given day, for given user
 */
calendarApi.post("/updateCalendar", async (req, res) => {
    try {
        const {
            username,
            dateIs,
            recipeOfTheDayID,
            recipeOfTheDayTitle,
            recipeOfTheDayIngredients,
        }
            = req.body;

        if (!username) {
            return res.status(400).json({ msg: "Calendar update requires a user." });
        }
        else if (!dateIs) {
            return res.status(400).json({ msg: "Calendar update requires a date to update." });
        }

        const userCalendar = await Calendar.findOne({ username });
        if (!userCalendar) {
            return res.status(400).json({ msg: "No calendar found." });
        }

        const calendarDays = userCalendar?.calendarDates ?? [];
        const index = calendarDays.findIndex((calDate) => calDate.dateIs === dateIs);
        if (index > -1) {
            // recipe of the day, previously existed, replace
            const calendarDate = {
                dateIs,
                recipeOfTheDayID,
                recipeOfTheDayTitle,
                recipeOfTheDayIngredients,
            };
            userCalendar.calendarDates[index] = calendarDate;
        }
        else {
            // did not exist previously, add new
            const calendarDate = {
                dateIs,
                recipeOfTheDayID,
                recipeOfTheDayTitle,
                recipeOfTheDayIngredients,
            };
            await userCalendar.calendarDates.push(calendarDate);
        }
        const updatedCalendar = await Calendar.findOneAndUpdate({ username }, userCalendar, { new: true });
        res.status(201).json(updatedCalendar);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Could not update calendar date.");
    }
});

module.exports = calendarApi;
