const express = require("express");
const user = require("../controllers/user.controllers");
const storage = require('../config/cloudinary.config')


const routesUser = express.Router();

routesUser.get("/signup", user.create);
routesUser.post("/newuser", storage.single('image'), user.doCreate);

routesUser.get("/login", user.login);
routesUser.post("/login", user.doLogin);

module.exports = routesUser
