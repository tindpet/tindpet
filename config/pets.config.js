const express = require("express");
const pets = require("../controllers/pets.controllers");

const routesPets = express.Router();

routesPets.get("/", pets.home);

routesPets.get('/pets', pets.list)

module.exports = routesPets