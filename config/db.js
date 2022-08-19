const mongoose = require("mongoose");

const connectToDb = async (MONGODB_URI) => {
    try {
        await mongoose.connect(MONGODB_URI, {});
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("Error connecting to MongoDB: ", err);
    }
};

module.exports = connectToDb;
