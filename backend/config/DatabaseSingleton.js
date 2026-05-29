const mongoose =
  require("mongoose");

class DatabaseSingleton {

  constructor() {

    if (
      DatabaseSingleton.instance
    ) {

      return DatabaseSingleton.instance;
    }

    DatabaseSingleton.instance =
      this;
  }

  async connect() {

    try {

      await mongoose.connect(
        process.env.MONGO_URI
      );

      console.log(
        "MongoDB Connected Successfully"
      );

    } catch (error) {

      console.error(
        "MongoDB Connection Failed:",
        error.message
      );

      process.exit(1);
    }
  }
}

const databaseInstance =
  new DatabaseSingleton();

Object.freeze(
  databaseInstance
);

module.exports =
  databaseInstance;