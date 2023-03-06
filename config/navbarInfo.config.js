const express = require("express");
const routesNavbar = express.Router();

const navbar = require("../controllers/navbarInfo.controller");
const storage = require("../config/cloudinary.config");

routesNavbar.get("/aboutus", navbar.aboutus);
routesNavbar.get("/contact", navbar.contact);
routesNavbar.get("/ordinaryquestions", navbar.ordinaryquestions);

module.exports = routesNavbar
