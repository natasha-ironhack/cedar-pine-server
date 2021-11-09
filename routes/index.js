const router = require("express").Router();
const authRoutes = require("./auth.routes");
const privateRoutes = require("./private.routes");
const { isLoggedIn } = require("../middlewares/authorization"); // middleware require if used here
const { isOwner } = require("../middlewares/authorization"); // middleware require if used here
const cartRoutes = require("./cart.routes");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const candlesRoutes = require("./candles.routes.js");
router.use("/candles", candlesRoutes);

// You put the next routes here 👇
router.use("/auth", authRoutes);

// we can add the middleware here or do it in private.routes.js
//in case only some routes will need the authorization
router.use("/private", isLoggedIn, privateRoutes);

router.use("/cart", cartRoutes);

module.exports = router;
