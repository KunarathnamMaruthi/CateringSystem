const mongoose = require("mongoose"); // maruthi changed this part

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    const conn = await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      `MongoDB Connected: ${conn.connection.host}`
    );

  } catch (err) {
    console.error(
      "MongoDB Error:",
      err.message
    );

    process.exit(1);
  }
};

module.exports = connectDB;