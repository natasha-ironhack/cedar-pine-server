// models/Candle.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CandleImageSchema = new Schema(
  {
    name: String,
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("CandleImage", CandleImageSchema);
