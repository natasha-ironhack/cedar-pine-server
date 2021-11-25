const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51JwpOZIoBhfXE7BSMAYeHkCmI7M29hfKqShDZTJWEr1t8Jtkg6KCroaW1XBvTCBzYitUd02vV7rdb0VaOO03cA2s00A3EBMuvM"
);
//items being received from front end
//return real value not 1400
const calculateOrderAmount = (items) => {
  return Object.keys(items).reduce(
    (total, item) => total + items[item].product.price * items[item].quantity,
    0
  );
  //CALCULATE TOTAL AMNT
  //GET RID OF COMMA IN AMOUNT
  //PUT EURO SIGN IN OTHER OBJ OR KEY

  //   cart is equal to whole object in front end
  // need to use ids of every element inside caulculate order amount function
  //on server, find them on db (like product.find) get the current price or
  //real rice, then multiply by each quantity
  // return some math
  // result of calculation between current price and quantity for every
  //product in cents
  // leave the item as is
};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    payment_method_types: [
      "card",
      // "bancontact",
      // "ideal",
    ],
  });

  // res.redirect('/confirmation', session.url);

  // res.redirect('/confirmation');

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;
