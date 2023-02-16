const Pet = require("../models/pets.model");

module.exports.home = (req, res) => {
  res.render("pages/home");
};

module.exports.list = (req, res) => {
  Pet.find()
    .then((pets) => {
      res.render("pages/pets", { pets });
    })
    .catch((error) => {
      console.log("error controller /pets");
    });
};
