const mongoose = require('mongoose');
const secrets = require('./secrets.tsx');

const uri = secrets.mongoURI;

mongoose.set("strictQuery", true, "useNewUrlParser", true);

const connectDB = async() => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to database.");
  } catch (err) {
    console.log("Failed to connect to database.");
    process.exit(1);
  }
}

module.exports.connectDB = connectDB;
