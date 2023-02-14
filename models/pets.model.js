const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: String,
  age: Number,
  specie: String,
  gender: String,
});

module.exports = mongoose.model("Pet", petSchema);
