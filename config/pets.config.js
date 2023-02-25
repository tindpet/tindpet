const express = require("express");
const routesPets = express.Router();

const pets = require("../controllers/pets.controllers");
const storage = require("../config/cloudinary.config");
const { isAdmin } = require("../middlewares/secure.mid");

routesPets.get("/", pets.home);

routesPets.get("/pets", pets.list);

routesPets.get("/pets/newpet", isAdmin, pets.createPet);
routesPets.post("/pets/newpet", storage.pet.single("image"), pets.doCreatePet);

routesPets.get("/pets/:id", pets.detail);

routesPets.get("/pets/:id/update", isAdmin, pets.update);
routesPets.post("/pets/:id", storage.pet.single("image"), pets.doUpdate);

module.exports = routesPets;
