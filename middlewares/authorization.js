// here is where all our authorization middlewares should be (isLoggedIn, isAdmin, isOwner)
module.exports = {
  isLoggedIn: (req, res, next) => {
    // if the user has an active session, continue
    if (req.session.user) {
      next(); // continue
    } else {
      res.status(403).json({ message: "you shall not pass!" });
    }
  },

  isAdmin: (req, res, next) => {
    // if the user has an active session, continue
    if (req.session.user.isAdmin) {
      next(); // continue
    } else {
      res.status(403).json({ message: "you shall not pass!" });
    }
  },

  isOwner: (req, res, next) => {
    // example.
    // go to the DB check if the user is the owner of the element to be deleted or edit
    // yes => next()
    // no => error
    if (req.session.user.isOwner) {
      next();
    } else {
      res.status(403).json({ message: "you shall not pass!" });
    }
  },
};
