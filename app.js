// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes");
app.use("/api", allRoutes);

//for CandleImage
const index = require("./routes/index"); // <== already included
app.use("/", index); // <== already included

//(backend route)
const candleImageRouter = require("./routes/candles.routes"); // <== has to be added
app.use("/api", candleImageRouter); // <== has to be added

//doesn't start with /api? will go here next:

//(front end route)
//will check for front end routes that exist in a react application
app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});

//(neither front end route or back end route? will go here:)
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
