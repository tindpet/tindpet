const express = require("express");
const user = require("../controllers/user.controllers");

const routes = express.Router();

routes.get("/signup", user.create);
routes.post("/newuser", user.doCreate);

routes.get("/login", user.login);
routes.post("/login", user.doLogin);

module.exports = (app) => {
  app.use("/", routes);
};
