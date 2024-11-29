const Book = require("../models/books.model");
const { cloudinary } = require("../utils/cloudinary");

//! Controllers
const books_index = (req, res) => {
  Book.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.json(result);
    })
    .catch(() => {
      res
        .status(400)
        .send(
          "Please Try Again Later <a href='https://nabdalqalam.com'>Click Here</a>"
        );
    });
};

const books_add = async (req, res) => {
  try {
    const uploadedResponse = await cloudinary.uploader.upload(req.body.img, {
      upload_preset: "nabdu_al_qalam",
    });

    const body = await { ...req.body, img: uploadedResponse?.url };

    const newBook = await Book.create(body);
    newBook.save();
    res.status(201).json({ msg: "New Book Uploaded" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const books_edit = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // If there's a new image, upload it
    if (updates.img && updates.img.startsWith("https://res.cloudinary.com")) {
      const uploadedResponse = await cloudinary.uploader.upload(updates.img, {
        upload_preset: "nabdu_al_qalam",
      });
      updates.img = uploadedResponse?.url;
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  books_index,
  books_add,
  books_edit,
};
