const mongoose = require("mongoose");
const schemaMessage = new mongoose.Schema(
  {
    message: {
      type: String,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
    },
    isReadByFrom: {
      type: Boolean,
      default: false,
    },
    isReadByTo: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Message", schemaMessage);
