const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log(`Connected to DB on ${process.env.PORT}`);
    })
    .catch((_) => {
      console.error("Database Connection Failed");
    });
};

module.exports = { connectToDB };
