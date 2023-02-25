require("dotenv").config();
require("./config/db.config");

const express = require("express");
const app = express();

const logger = require("morgan");
const routesUser = require("./config/user.config");
const routesPets = require("./config/pets.config");
const { session, loadSessionUser } = require("./config/session.config");

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));

app.use(session);
app.use(loadSessionUser);

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use("/", routesUser);
app.use("/", routesPets);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
