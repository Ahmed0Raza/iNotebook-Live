const mongoose = require('mongoose');

// Replace <password> with your actual password
const mongoURI = "mongodb+srv://f223335:rDps6xABY1PceDNZ@cluster0.4y3xlsg.mongodb.net/inotebook?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = async () => {
    console.log("Attempting to connect to MongoDB...");

    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

module.exports = connectToMongo;
