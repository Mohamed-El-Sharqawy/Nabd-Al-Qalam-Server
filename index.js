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
// const Order = require("./models/orders.model");

// Initialize App and Listen to the PORT
const app = express();

// // Cors
// const whitelist = [
//   "https://nabdalqalam.com",
//   "localhost:5173",
// ];
// const corsConfigs = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "OPTIONS"],
// };

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

// app.post("/paymentt-checkout", async (req, res) => {
//   let order = await Order.create({
//     orderTitle: `${req.body.checkoutDetails.requestId} ${req.body.checkoutDetails.orderId}`,
//     orderTotalPrice: req.body.checkoutDetails.amount,
//   });

//   order = await order.save();

//   req.body.checkoutDetails.orderId = order._id;
//   req.body.checkoutDetails.requestId = order._id;

// //   const data = await response.json();
// //   res.json(data);
// // });
// // app.get("/get-payment/:id", async (req, res) => {
// //   const {id} = req.query;

//   const data = await response.json();

//   console.log(data);

//   await Order.updateOne(
//     { _id: order._id },
//     {
//       orderId: data.result?.id,
//       orderItems: req.body.checkoutDetails.items,
//       customer: req.body.checkoutDetails.customer,
//       deliveryAddress: req.body.checkoutDetails.deliveryAddress,
//     }
//   );

//   res.json(data);
// });

// app.get("/get-payment/:id", async (req, res) => {
//   const { id } = req.query;

//   const response = await fetch(
//     `https://api.test.paymennt.com/mer/v2.0/payment/${
//       id ?? "1797898212052478345"
//     }`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Paymennt-Api-Key": "18d545c4bb995080",
//         "X-Paymennt-Api-Secret":
//           "mer_18d09da3ed1fa21b933cb6fee103f21f92df1a1b24fef31ea408ddabcc7283dd",
//       },
//     }
//   );

//   const data = await response.json();

//   res.json(data);
// });

// app.get("/orders", async (req, res) => {
//   // const data = await Order.deleteMany({orderTotalPrice: 100});
//   const data = await Order.find({});

//   res.json(data);
// });

app.use("/", routes);
app.use("/", authRouter);
app.use("/", usersRouter);
app.use("/", stripeRouter);
