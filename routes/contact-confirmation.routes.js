const router = require("express").Router();

router.post("/contact-confirmation", (req, res, next) => {

  if (req.session.user) {
    next(); 
  } else {
    res.status(403).json({ message: "Something something something." });
  }
  res.status(403).json({ errorMessage: "You're not authenticated." });
});

module.exports = router;
