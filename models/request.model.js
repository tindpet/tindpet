const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const request = new Schema({
  userId: String,
  petId: String,
  match: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Request", request);
