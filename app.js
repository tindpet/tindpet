const { setupHandlebars } = require("./config/hbs.config");
require("dotenv").config();
require("./config/db.config");

const express = require("express");
const app = express();

setupHandlebars(app)

const logger = require("morgan");
const routesUser = require("./config/user.config");
const routesPets = require("./config/pets.config");
const routesMessage = require("./config/message.config");
const routesNavbar = require("./config/navbarInfo.config")

const { session, loadSessionUser } = require("./config/session.config");

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
app.use("/", routesMessage);
app.use('/', routesNavbar);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
