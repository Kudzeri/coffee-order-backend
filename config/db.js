require('dotenv').config();
const mongoose = require("mongoose");

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing in the .env file");
  process.exit(1);
}


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
