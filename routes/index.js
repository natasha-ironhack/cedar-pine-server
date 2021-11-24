const router = require("express").Router();
const authRoutes = require("./auth.routes");
const privateRoutes = require("./private.routes");
const { isLoggedIn } = require("../middlewares/authorization"); // middleware require if used here
// const { isOwner } = require("../middlewares/authorization"); // middleware require if used here
const cartRoutes = require("./cart.routes");
const checkoutRoutes = require("./checkout.routes");
const confirmationRoutes = require("./confirmation.routes");
const paymentRoutes = require("./payment.routes");
const shippingRoutes = require("./shipping.routes");
const faqRoutes = require("./faq.routes");
const contactUsRoutes = require("./contact-us.routes");
const aboutUsRoutes = require("./about-us.routes");
const contactConfirmationRoutes = require("./contact-confirmation.routes");
const homeRoutes = require("./home.routes");
const diffusersRoutes = require("./diffusers.routes");
const waxmeltsRoutes = require("./wax-melts.routes");

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

router.use("/checkout", checkoutRoutes);

router.use("/payment", paymentRoutes);

router.use("/confirmation", confirmationRoutes);

// const carouselRoutes = require("./carousel.routes.js");
// router.use("/carousel", carouselRoutes);

router.use("/shipping", shippingRoutes);

router.use("/faq", faqRoutes);

router.use("/contact-us", contactUsRoutes);

router.use("/about-us", aboutUsRoutes);

router.use("/contact-confirmation", contactConfirmationRoutes);

router.use("/home", homeRoutes);

router.use("/diffusers", diffusersRoutes);

router.use("/waxmelts", waxmeltsRoutes);

module.exports = router;
