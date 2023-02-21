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



module.exports.createPet = (req, res) => {
  res.render("pages/newpet");
};

module.exports.doCreatePet = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path
  }
  
  Pet.findOne({ email: req.body.email })
    .then(
        res.render("pages/newpet")
        )
    .catch((error) => next(error));
};
