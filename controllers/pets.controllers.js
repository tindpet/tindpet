const Pet = require("../models/pets.model");

module.exports.home = (req, res) => {
  Pet.find()
  .limit(8)
  .then((pets) => {
    res.render("pages/home", { pets })
  })
  .catch((error) => {
    console.log('error controller /home')
  })
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

