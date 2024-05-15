const express = require("express");
const usersRouter = express.Router();
const { users_get, users_get_one } = require("../controllers/users.controller");

usersRouter.get("/users", users_get);
usersRouter.get("/users/:id", users_get_one);

module.exports = usersRouter;
