const dataBase = require("../config/db.config");
const petModel = require("../models/pets.model");
const pets = require("./pets");

const processModel = () => {
  petModel
    .deleteMany()
    .then(() => {
      return petModel.create(pets).then(() => {
        console.log("The DataBase has been seeded");
        dataBase.disconnect();
      });
    })
    .catch((error) => {
      console.log(`The DataBase has not been seeded: ${error}`);
      dataBase.disconnect();
    });
};

const seed = () => {
  dataBase.connect(processModel());
};

seed();
