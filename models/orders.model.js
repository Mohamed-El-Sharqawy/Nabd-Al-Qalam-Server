const mongoose = require("mongoose");

const OrderItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unitprice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  linetotal: {
    type: Number,
    required: true,
  },
});

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
    orderId: {
      type: String,
    },
    orderItems: {
      type: [OrderItemsSchema],
    },
    customer: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    deliveryAddress: {
      name: {
        type: String,
      },
      address1: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zip: {
        type: String,
      },
      country: {
        type: String,
      },
      set: {
        type: Boolean,
      },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
