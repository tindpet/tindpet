const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  mail: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "user", "protector"],
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
