require("dotenv").config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URL;

const connectToMongo = async () => {
    console.log("Attempting to connect to MongoDB...");

    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

module.exports = connectToMongo;
