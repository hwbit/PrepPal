const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("dotenv");

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
        type: [String],
        default: "logo.png",
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
