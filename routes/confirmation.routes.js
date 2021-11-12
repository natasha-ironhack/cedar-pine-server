const router = require("express").Router();

router.post("/confirmation", (req, res, next) => {
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
