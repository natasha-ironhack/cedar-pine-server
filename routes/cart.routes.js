const router = require("express").Router();

router.post("/cart", (req, res, next) => {
  const { quantity, price, name, weight } = req.body;

  //lets u know if anyone is logged in
  //lets you know if backend has anyone saved in the session
  //lets you know if there's a user in the backend session
  if (req.session.cart) {
    return res.json({ cart: req.session.cart });
  }

  res.status(403).json({ errorMessage: "You're not authenticated." });
});
