const mongoose = require("mongoose");

const connectDB = async () => {
  try {
<<<<<<< HEAD
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected:", conn.connection.host);
  } catch (err) {
    console.error(err.message);
=======
    console.log(" Connecting to MongoDB...");

    const conn = await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      ` MongoDB Connected: ${conn.connection.host}`
    );

  } catch (err) {
    console.error(
      " MongoDB Error:",
      err.message
    );

>>>>>>> faed3db (Save remaining changes)
    process.exit(1);
  }
};

module.exports = connectDB;