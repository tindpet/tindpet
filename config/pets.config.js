const express = require("express");
const pets = require("../controllers/pets.controllers");
const storage = require('../config/cloudinary.config')

const routesPets = express.Router();

routesPets.get("/", pets.home);

routesPets.get("/pets", pets.list);

routesPets.get("/pets/newpet", pets.createPet);
routesPets.post("/pets/newpet", storage.pet.single('image'), pets.doCreatePet);

routesPets.get("/pets/:id", pets.detail);

routesPets.get('/pets/:id/update', pets.update)
routesPets.post('/pets/:id', storage.pet.single('image'), pets.doUpdate)

module.exports = routesPets;
