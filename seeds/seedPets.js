require("../config/db.config");
const petModel = require("../models/pets.model");
const pets = require("./pets");

const seed = () => {
    petModel
      .deleteMany()
      .then(() => {
        return petModel.create(pets).then(() => {
          console.log("The DataBase has been seeded");
        });
      })
      .catch((error) => {
        console.log(`The DataBase has not been seeded: ${error}`);
      })
};

seed();