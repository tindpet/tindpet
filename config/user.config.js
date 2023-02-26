const express = require("express");
const routesUser = express.Router();

const user = require("../controllers/user.controllers");
const storage = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middlewares/secure.mid");

routesUser.get("/signup", user.create);
routesUser.post("/register", storage.user.single("image"), user.doCreate);

routesUser.get("/login", user.login);
routesUser.post("/login", user.doLogin);

routesUser.get("/user/:id", isAuthenticated, user.detail);
routesUser.get("/user/:id/update", isAuthenticated, user.update);
routesUser.post("/user/:id", storage.user.single("image"), user.doUpdate);
routesUser.get('/logout', user.logOut)


module.exports = routesUser;
