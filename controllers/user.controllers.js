const UserModel = require("../models/user.model");
const Like = require("../models/likes.model");
const Pets = require("../models/pets.model");
const bcrypt = require("bcryptjs");

module.exports.create = (req, res) => res.render("pages/users/signup");

module.exports.doCreate = (req, res, next) => {
  if (req.file) req.body.image = req.file.path;

  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.render("pages/users/signup");
      } else {
        return UserModel.create(req.body).then(() => res.redirect("/login"));
      }
    })
    .catch((error) => next(error));
};

module.exports.login = (req, res) => {
  res.render("pages/users/login");
};

module.exports.doLogin = (req, res, next) => {
  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      return bcrypt
        .compare(req.body.password, user.password)
        .then((isAuthenticated) => {
          if (isAuthenticated) {
            req.session.userId = user.id;
            res.redirect("/pets");
          }
          return res.sendStatus(401);
        });
    })
    .catch((err) => console.error(err));
};

module.exports.detail = (req, res, next) => {
  UserModel.findById(req.user.id)
    .then((user) => {
      if (req.user.role === "adopter") {
        return Like.find({ user: user })
          .populate("pet")
          .then((likes) => {
            if (likes) {
              const pets = [];

              likes.forEach((like) => {
                like.pet.like = true;
                like.pet.button = true;

                pets.push(like.pet);
              });

              res.render("pages/users/detail", { user, pets: pets });
            }
          });
      } else {
        Pets.find({ protectorId: req.user.id })
          .then((pets) => {
            return res.render("pages/users/detail", { user, pets });
        });
      }
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  UserModel.findById(req.params.id)
    .then((user) => res.render("pages/users/update", { user }))
    .catch(next);
};

module.exports.doUpdate = (req, res, next) => {
  if (req.file) req.body.image = req.file.path;

  UserModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then(() => res.redirect(`/user/${req.params.id}`))
    .catch((err) => console.log(err));
};

module.exports.logOut = (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
};
