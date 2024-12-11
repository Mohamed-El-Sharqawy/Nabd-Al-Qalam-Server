// Imports
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./routes/books.routes");
const authRouter = require("./routes/auth.routes");
const usersRouter = require("./routes/users.routes");
const stripeRouter = require("./routes/checkout.routes");
const cors = require("cors");
const { connectToDB } = require("./utils/db");
require("dotenv").config();

// Initialize App and Listen to the PORT
const app = express();

app.use(cors());

// Static Files, Logs and Middlewares
app.use(express.static("public"));
app.use(morgan("dev"));

//TODO Parse Body and Configure the limit size of the data
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

try {
  app.listen(process?.env?.PORT || 3000, () => {
    connectToDB();
  });
} catch (error) {
  console.error("Server Connection Failed", error);
}

app.use("/", routes);
app.use("/", authRouter);
app.use("/", usersRouter);
app.use("/", stripeRouter);
