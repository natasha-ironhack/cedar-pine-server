const router = require("express").Router();
const stripe = require("stripe")("sk_test_Gx4mWEgHtCMr4DYMUIqfIrsz");

const calculateOrderAmount = (item) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

router.post("/create-payment-intent", async (req, res) => {
  const { item } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(item),
    currency: "eur",
    payment_method_types: [
      "giropay",
      "eps",
      "p24",
      "sofort",
      "sepa_debit",
      "card",
      "bancontact",
      "ideal",
    ],
  });

  // res.redirect('/confirmation', session.url);

  // res.redirect('/confirmation');

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;
