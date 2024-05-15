const express = require("express");
const authRouter = express.Router();
const { signup_post, login_post } = require("../controllers/auth.controller");

//! Signup
authRouter.post("/signup", signup_post);

//! Login
authRouter.post("/login", login_post);

module.exports = authRouter;
