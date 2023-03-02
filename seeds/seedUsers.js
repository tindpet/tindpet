require("../config/db.config");
const userModel = require("../models/user.model");
const users = require("./users");

const seedUsers = () => {
  userModel
    .deleteMany()
    .then(() => {
      return userModel.create(users).then(() => {
        console.log("The DataBase has been seeded");
      });
    })
    .catch((error) => {
      console.log(`The DataBase has not been seeded: ${error}`);
    });
};

seedUsers();
