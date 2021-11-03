const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const candlesSchema = new Schema(
  {
    // picture,
    candleName: { type: String, required: true, unique: true },
    price: { type: number, required: true, unique: true },
    // Add to cart button,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Candles = model("Candles", candlesSchema);

module.exports = Candles;
