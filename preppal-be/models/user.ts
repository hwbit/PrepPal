import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    ownRecipes: {
        type: Array,
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