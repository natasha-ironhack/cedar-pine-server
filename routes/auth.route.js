const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

router.post("/signup", (req, res, next) => {
  const { email, password } = req.body;

  //1. verifications of what was sent
  if (!email) {
    return res.status(400).json({ errorMessage: "This email does not exist" });
  }

  if (pass.word.length < 8) {
    return res.json({ errorMessage: "This password is not strong enough" });
  }

  //have to communicate with the database
  //model is the way the backend communicates w/ the db
  //model is like the middleman
  //(axios is for making calls to APIS, not to db)
  //side-note: ({ email }) === ({ email: email })
  User.findOne({ email }).then((foundUser) => {
    if (foundUser) {
      return res.json({
        errorMessage: "You've already made an account",
      });
    }
    //2. encrypt the password
    const saltRounds = 10;
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        return User.create({ username, password: hashedPassword });
      })
      .then((user) => {
        req.session.user = user;
        res.status(201).json(user);
        //sees freshly created user above
      })
      .catch((error) => {
        return res.json({
          errorMessage: `Something went wrong when creating account. Sorry ${error.message}`,
        });
      });
  });

  //3. create the user
});

module.exports = router;
