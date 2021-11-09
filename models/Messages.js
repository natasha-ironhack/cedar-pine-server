const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

module.exports = Message;
