// routes/thing.routes.js

const express = require("express");
const router = express.Router();

// **** require Movie model in order to use it ****
const CandleImage = require("../models/CandleImage.model");

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

// GET '/api/movies' => Route to list all available movies
router.get("/candles", (req, res, next) => {
  CandleImage.find()
    .then((candleImageFromDB) => res.status(200).json(candleImageFromDB))
    .catch((err) => next(err));
});

// POST '/api/upload' => Route that will receive an image, send it to Cloudinary via the fileUploader and return the image URL
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log('file is: ', req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get the URL of the uploaded file and send it as a response.
  // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ secure_url: req.file.path });
});

// POST '/api/movies/create' => for saving a new movie in the database
router.post("/candles/create", (req, res, next) => {
  // console.log('body: ', req.body); ==> here we can see that all
  // the fields have the same names as the ones in the model so we can simply pass
  // req.body to the .create() method

  CandleImage.create(req.body)
    .then((newlyCreatedCandleImageFromDB) => {
      // console.log('Created new movie: ', newlyCreatedMovieFromDB);
      res.status(200).json(newlyCreatedCandleImageFromDB);
    })
    .catch((err) => next(err));
});

module.exports = router;
