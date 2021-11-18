const router = require("express").Router();
const stripe = require("stripe")('sk_test_51JwpOZIoBhfXE7BSMAYeHkCmI7M29hfKqShDZTJWEr1t8Jtkg6KCroaW1XBvTCBzYitUd02vV7rdb0VaOO03cA2s00A3EBMuvM');
//items being received from front end
//return real value not 1400
const calculateOrderAmount = (itemToBuy) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
  //CALCULATE TOTAL AMNT
  //GET RID OF COMMA IN AMOUNT
  //PUT EURO SIGN IN OTHER OBJ OR KEY
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
