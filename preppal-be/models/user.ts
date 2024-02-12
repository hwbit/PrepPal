const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: "Hi!"
    },
    ownRecipes: {
        type: Array
    },
    savedRecipes: {
        type: Array
    },
    friends: {
        type: Array
    },
    following: {
        type: Array
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;