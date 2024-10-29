require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const router = express.Router();

export function calculateTotalPriceWithTax(cartTotalPrice) {
  // Define the tax rate
  const taxRate = 1.5 / 100; // 1.5%

  // Calculate the subtotal (cart total + shipping)
  const subtotal = cartTotalPrice;

  // Calculate the tax amount
  let taxAmount = subtotal * taxRate;

  // If the tax amount is less than $1, set taxAmount to $1
  if (taxAmount < 1) {
    taxAmount = 1;
  }

  // Calculate the total price with the adjusted tax amount
  const totalPrice = subtotal + taxAmount;

  // Return the total price
  return totalPrice;
}

router.post("/create-checkout-session", async (req, res) => {
  const line_items = req.body.cartItems?.map((book) => {
    return {
      price_data: {
        currency: "aed",
        product_data: {
          name: book?.arTitle,
          images: [book?.img],
          description: book?.arDescription,
          metadata: {
            id: book?._id,
          },
        },
        unit_amount: +book.price * 100,
      },
      quantity: book.quantity,
    };
  });

  const taxes = calculateTotalPriceWithTax(
    req.body.cartItems.reduce(
      (total, book) => +total + +book.price * book.quantity,
      0
    )
  );

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["AE", "EG", "BH", "OM", "SA"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 10 * 100 + taxes * 100,
            currency: "aed",
          },
          display_name: "Shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 3,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/shopping-cart`,
  });

  res.send({ url: session.url });
});

module.exports = router;
