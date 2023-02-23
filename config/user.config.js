const express = require("express");
const user = require("../controllers/user.controllers");
const storage = require('../config/cloudinary.config')


const routesUser = express.Router();

routesUser.get("/signup", user.create);
routesUser.post("/register", storage.user.single('image'), user.doCreate);

routesUser.get("/login", user.login);
routesUser.post("/login", user.doLogin);

routesUser.get("/user/:id", user.detail);
routesUser.get("/user/:id/update", user.update);
routesUser.post("/user/:id", storage.user.single('image'), user.doUpdate);

module.exports = routesUser
