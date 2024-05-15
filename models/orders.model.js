const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderTitle: {
      type: String,
      required: true,
    },
    orderTotalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
