const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log("Mongo connected...");
  } catch (error) {
    console.log("Mongo failed");
    console.log(error);
  }
};

module.exports = connectDB;
