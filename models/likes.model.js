const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  pet: { type: Schema.Types.ObjectId, ref: "Pet" },
});

module.exports = mongoose.model("Like", likeSchema);
