const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: String,
  age: Number,
  specie: String,
  gender: String,
  image: String,
  description: String,
  protectorId: { type: Schema.Types.ObjectId, ref: "User" },
});

petSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'pet',
  justOne: false
})

module.exports = mongoose.model("Pet", petSchema);
