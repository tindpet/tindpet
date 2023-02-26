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
  const criteria = {};

  if (req.query.search) {
    criteria.specie = new RegExp(req.query.search);
  }

  Pet.find(criteria)
    .then((pets) => {
      res.render("pages/pets/pets", { pets, query: req.query });
    })
    .catch((error) => {
      console.log("error controller /pets");
    });
};

module.exports.createPet = (req, res) => {
  res.render("pages/pets/newpet");
};

module.exports.doCreatePet = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path
  }
  
  const newPet = req.body
  newPet.protectorId = req.user.id

  Pet.create(newPet)
    .then((pet) => res.redirect(`/pets/${pet.id}`))
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  Pet.findById(req.params.id)
    .then((pet) => res.render("pages/pets/detail", { pet }))
    .catch(next);
};

module.exports.update = (req, res, next) => {
  Pet.findById(req.params.id)
    .then((pet) => {
      res.render("pages/pets/update", { pet });
    })
    .catch(next);
};

module.exports.doUpdate = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
  }
  console.log(req.body);
  Pet.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then(() => {
      res.redirect(`/pets/${req.params.id}`);
  })
  .catch(err => console.log(err))
};