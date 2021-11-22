const router = require("express").Router();
const User = require("../models/User.model.js");
const { isLoggedIn } = require("../middlewares/authorization"); // middleware require if used here

// example of a private route
// we can add the middleware here or do it in index.js in case all files will need that authorization
router.get("/", (req, res, next) => {
  // example of accessing private information from DB

  User.find({}, { firstName: 1 })
    .then((data) => res.json(data))
    .catch((err) => next(err));

  const privateData = {
    message:
      "Hi `{user.firstName}`! Glad to have you back! You can check out our extensive list of candles below. Make sure to come back often to check out special deals and coupons available on your account ;)",
  };

  res.status(200).json(privateData); // send the data with a 200 message
});

module.exports = router;
