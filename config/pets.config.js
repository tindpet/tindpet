

const express = require("express");
const pets = require("../controllers/pets.controllers");

const routes = express.Router();

routes.get("/", pets.home);

routes.get('/pets', pets.list)

module.exports = (app) => {
  app.use("/", routes);
};