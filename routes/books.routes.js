const express = require("express");
const router = express.Router();
const { books_index, books_add, books_edit } = require("../controllers/books.controller");

router.get("/", books_index);

router.post("/add-books", books_add);
router.patch("/edit/:id", books_edit);

module.exports = router;
