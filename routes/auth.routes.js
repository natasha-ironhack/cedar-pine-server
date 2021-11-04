const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

router.post("/signup", (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  // verifications of what was sent
  if (!email) {
    return res.status(400).json({
      errorMessage: "This email does not exist.",
    });
  }
  if (password.length < 8) {
    return res.json({ errorMessage: "That password is not strong enough." });
  }

  //have to communicate with the database
  //model is the way the backend communicates w/ the db
  //model is like the middleman
  //(axios is for making calls to APIS, not to db)
  //side-note: ({ email }) === ({ email: email })
  User.findOne({ email }).then((foundUser) => {
    if (foundUser) {
      return res.json({
        errorMessage: "This email is already taken.",
      });
    }
    // encrypt the password
    const saltRounds = 10;
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        return User.create({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });
      })
      .then((user) => {
        req.session.user = user;
        res.status(201).json(user);
        //sees freshly created user above
      })
      .catch((error) => {
        return res.json({
          errorMessage: `Something went wrong when creating the user. Sorry. ${error.message}`,
        });
      });
  });
  // create the user
});
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      errorMessage: `Hey! Did you forget something? ${
        email ? "password" : password ? "email and password" : "email"
      }`,
    });
  }
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.json({
          errorMessage: "You do not have an account.",
        });
      }
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.json({ errorMessage: "Wrong password." });
        }
        req.session.user = user;
        return res.json(user);
      });
    })
    .catch((error) => {
      next(error);
    });
});
router.post("/logout", (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        errorMessage: `Something went wrong with the logout: ${error.message}`,
      });
    }
    res.json({ successMessage: "Logged out!" });
  });
});

router.get("/loggedin", (req, res, next) => {
  if (req.session.user) {
    return res.json({ user: req.session.user });
  }
  res.status(403).json({ errorMessage: "You're not authenticated." });
});

module.exports = router;
