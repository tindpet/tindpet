const express = require("express");
const routesPets = express.Router();

const pets = require("../controllers/pets.controllers");
const storage = require("../config/cloudinary.config");
const { isProtector } = require("../middlewares/secure.mid");

routesPets.get("/", pets.home);

routesPets.get("/pets", pets.list);

routesPets.get("/pets/newpet", isProtector, pets.createPet);
routesPets.post("/pets/newpet", storage.pet.single("image"), pets.doCreatePet);

routesPets.get("/pets/:id", pets.detail);

routesPets.get("/pets/:id/update", isProtector, pets.update);
routesPets.post("/pets/:id", storage.pet.single("image"), pets.doUpdate);

routesPets.post("/pets/:id/like", pets.like);

routesPets.post('/pets/:id/delete',  pets.delete)

module.exports = routesPets;
