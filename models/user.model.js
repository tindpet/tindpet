const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const ADMIN_USERS = (process.env.ADMIN_USERS || "admin@admin.com")
  .split(",")
  .map((email) => email.trim());

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "user", "protector"],
    default: "user",
  },
});

userSchema.pre("save", function (next) {
  if (ADMIN_USERS.includes(this.email)) {
    this.role = "admin";
  }

  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, 10)
      .then((encryptedPassword) => {
        this.password = encryptedPassword;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
