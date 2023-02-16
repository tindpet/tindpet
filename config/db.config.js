const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/tindpet";

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log("MongoDB connected");
  })
  .catch((error) => console.log(`Error on DB: ${error}`));


module.exports = mongoose