const router = require("express").Router();

router.post("/createCheckout", (req, res, next) => {
  const {
    firstName,
    lastName,
    country,
    streetNHouseNumber,
    postCode,
    city,
    email,
  } = req.body;
  Billing.create({
    firstName,
    lastName,
    country,
    streetNHouseNumber,
    postCode,
    city,
    email,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});


router.post("/checkout", (req, res, next) => {
  const { quantity, price, name, weight } = req.body;

  //lets u know if anyone is logged in
  //lets you know if backend has anyone saved in the session
  //lets you know if there's a user in the backend session
  //req.session.user
  if (req.session.user) {
    next(); // continue
  } else {
    res.status(403).json({ message: "Something something something." });
  }
  res.status(403).json({ errorMessage: "You're not authenticated." });
});

module.exports = router;
