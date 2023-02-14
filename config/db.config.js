const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/tindpet';

module.exports.connect = (code) => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("MongoDB connected");
      code;
    })
    .catch((error) => console.log(`Error on DB: ${error}`));
};

module.exports.disconnect = () => {
  mongoose
    .disconnect(MONGODB_URI)
    .then(() => console.log("MongoDB disconnected"))
    .catch((error) => console.log(`Error on DB: ${error}`));
};
