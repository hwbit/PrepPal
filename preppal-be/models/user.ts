const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("dotenv");

const defaultImage = process.env.DEFAULT_LOGO_URL;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: "Hi!",
    },
    ownRecipes: {type: [String]},
    savedRecipes: {type: [String]},
    following: {type: [String]},
    image: {
        type: String,
        default: defaultImage,
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
