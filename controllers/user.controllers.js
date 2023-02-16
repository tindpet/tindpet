const UserModel = require("../models/user.model");
const dataBase = require("../config/db.config");
const bcrypt = require("bcryptjs");

module.exports.create = (req, res) => {
  res.render("pages/users/signup");
};

module.exports.doCreate = (req, res, next) => {
  dataBase.connect(
    UserModel.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          res.render("pages/users/signup");
        } else {
          return UserModel.create(req.body).then(() => res.redirect("/login"));
        }
      })
      .catch((error) => next(error))
  );
};

module.exports.login = (req, res) => {
  res.render("pages/users/login");
};

module.exports.doLogin = (req, res, next) => {
  dataBase.connect(
    UserModel.findOne({ email: req.body.email })
      .then((user) => {
        return bcrypt
          .compare(req.body.password, user.password)
          .then((isAuthenticated) => {
            if (isAuthenticated) {
              // req.session.userId = user.id;
              res.redirect("/pets");
            }
          });
      })
      .catch(next)
  );
};
