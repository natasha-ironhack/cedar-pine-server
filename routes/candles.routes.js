const router = require("express").Router();
const Candle = require("../models/Candle.js");
const { isOwner } = require("../middlewares/authorization.js");
const fileUploader = require("../config/cloudinary.config");

// Create a new candle element.
//want to create a route to create a new element in our database
//server gonna grab data from database, send it to front-end
//explanation #2: creates an entry into the database, server grabs it, and
//sends it back to the front-end with res.json (i think)
router.post("/create", isOwner, (req, res, next) => {
  const { image, name, price, weight, quantity, description } = req.body;
  Candle.create({
    image,
    name,
    price,
    weight,
    quantity,
    description,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});
//api is already in app.js, don't need to type it again for /create

// Display the list of all candle elements *only titles
router.get("/all", (req, res, next) => {
  Candle.find({}, { image: 1, name: 1, price: 1 })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});
//get is only for getting info

// Display a specific element with all info
router.get("/:id", (req, res, next) => {
  Candle.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// Delete a specific element
router.delete("/:id", isOwner, (req, res, next) => {
  Candle.findByIdAndDelete(req.params.id)
    .then((data) => res.json("Deleted!" + data._id))
    //sending data to the front
    //change it to data.id to see all info deleted on Postman
    .catch((err) => next(err));
});

// edit a specific element
router.patch("/:id", isOwner, (req, res, next) => {
  Candle.findByIdAndUpdate(
    req.params.id,
    {
      image: req.body.image,
      name: req.body.name,
      price: req.body.price,
      weight: req.body.weight,
      quantity: req.body.quantity,
      description: req.body.description,
    },
    { new: true }
  )
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// POST '/api/upload' => Route that will receive an image, send it to Cloudinary via the fileUploader and return the image URL
router.post('/upload', fileUploader.single('image'), (req, res, next) => {
  // console.log('file is: ', req.file)
 
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  // get the URL of the uploaded file and send it as a response.
  // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend
 
  res.json({ secure_url: req.file.path });
});

module.exports = router;

// What does the FrontEnd Need?

// Delete a specific toDo element
// edit a specific toDo element
