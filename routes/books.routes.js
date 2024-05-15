const express = require("express");
const router = express.Router();
const { books_index, books_add } = require("../controllers/books.controller");

router.get("/", books_index);

router.post("/add-books", books_add);

module.exports = router;
