const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    return true;
  } catch (error) {
    console.log("Error connecting to DB:", error.message);
    return false;
  }
};

module.exports = connectToDB;
