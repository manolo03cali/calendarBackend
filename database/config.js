const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {});
    console.log("DB Online");
  } catch (error) {
    console.error(error);
    throw new Error("Error al iniciar la base de datos");
  }
};
module.exports = {
  dbConnection,
};
// This code connects to a MongoDB database using Mongoose.
// It exports a function `dbConnection` that attempts to connect to the database
