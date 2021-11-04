const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const candleSchema = new Schema(
  {
    image: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    price: { type: Decimal128, required: true },
    weight: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Candle = model("Candle", candleSchema);

module.exports = Candle;
