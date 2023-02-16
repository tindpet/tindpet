const express = require("express");
const user = require("../controllers/user.controllers");

const routesUser = express.Router();

routesUser.get("/signup", user.create);
routesUser.post("/newuser", user.doCreate);

routesUser.get("/login", user.login);
routesUser.post("/login", user.doLogin);

module.exports = routesUser
