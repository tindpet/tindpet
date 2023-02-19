require("dotenv").config();
require("./config/db.config");

const cloudinary = require('cloudinary').v2;

const express = require("express");
const app = express();
const logger = require("morgan");

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(logger("dev"));

app.use(express.urlencoded({ extended: false }));

app.use(express.static(`${__dirname}/public`));

const routesUser = require("./config/user.config");
app.use("/", routesUser);

const routesPets = require("./config/pets.config");
app.use("/", routesPets);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
