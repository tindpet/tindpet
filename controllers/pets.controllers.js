const Pet = require("../models/pets.model");
const Like = require("../models/likes.model");

module.exports.home = (req, res) => {
  Pet.find()
    .limit(8)
    .then((pets) => res.render("pages/home", { pets }))
    .catch((error) => {
      console.log("error controller /home");
    });
};

module.exports.list = (req, res) => {
  const criteria = {};

  if (req.query.search) {
    let lowerCaseSearch = req.query.search.toLowerCase();
    criteria.specie = new RegExp(lowerCaseSearch);
  }

  Pet.find(criteria)
    .populate("likes")
    .then((pets) => {
      if (req.user.role === "adopter") {
        const newPets = JSON.parse(JSON.stringify(pets));

        newPets.map((pet) => {
          pet.button = true;
          return pet;
        });

        return Like.find({ user: req.user })
          .populate("pet")
          .then((likes) => {
            if (likes) {
              likes.forEach((like) => {
                newPets.map((pet) => {
                  if (pet._id === like.pet.id) {
                    pet.like = true;
                  }
                  return pet;
                });
              });
            }
            res.render("pages/pets/pets", {
              pets: newPets,
              query: req.query,
            });
          });
      }
      return res.render("pages/pets/pets", {
        pets,
        query: req.query,
      });
    })
    .catch((error) => {
      console.log("error controller /pets: " + error);
    });
};

module.exports.createPet = (req, res) => {
  res.render("pages/pets/newpet");
};

module.exports.doCreatePet = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
  }

  const newPet = req.body;
  newPet.protectorId = req.user.id;

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
    .then((pet) => res.render("pages/pets/update", { pet }))
    .catch(next);
};

module.exports.doUpdate = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
  }
  Pet.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then(() => res.redirect(`/pets/${req.params.id}`))
    .catch((err) => console.log(err));
};

module.exports.like = (req, res, next) => {
  const likeParams = { user: req.user.id, pet: req.params.id };

  let likes = 0;

  Like.findOne(likeParams)
    .then((like) => {
      if (like) {
        likes = -1;
        return Like.findByIdAndDelete(like.id);
      }

      likes = 1;
      return Like.create(likeParams);
    })
    .then((like) => res.json({ likes }))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Pet.findByIdAndDelete(req.params.id)
  .then((pet) => {
    res.redirect("/pets") 
  })
  .catch(next)
}