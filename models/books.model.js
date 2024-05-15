const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    enTitle: {
      type: String,
      required: true,
    },
    arTitle: {
      type: String,
      required: true,
    },
    enDescription: {
      type: String,
      required: true,
    },
    arDescription: {
      type: String,
      required: true,
    },
    enAuthor: {
      type: String,
      required: true,
    },
    arAuthor: {
      type: String,
      required: true,
    },
    numberOfPages: {
      type: Number,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    ageGroup: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
