const { Schema, model } = require("mongoose");

const billingSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    streetNHouseNumber: { type: String, required: true },
    postCode: { type: Number, required: true },
    city: { type: String, required: true },
    email: {},
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Billing = model("Billing", billingSchema);

module.exports = Billing;
