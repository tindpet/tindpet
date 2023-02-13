const express = require("express");
const pets = require("../controllers/pets.controllers");

const routes = express.Router();

routes.get("/", pets.home);

module.exports = (app) => {
  app.use("/", routes);
};
