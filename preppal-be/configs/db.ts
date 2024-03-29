const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;

mongoose.set("strictQuery", true);

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to database.");
    }
    catch (err) {
        console.log("Failed to connect to database.");
        process.exit(1);
    }
};

const closeDatabase = async () => {
    await mongoose.connection.close();
};

module.exports.connectDB = connectDB;
module.exports.closeDatabase = closeDatabase;
