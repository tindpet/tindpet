require('dotenv').config();

const express = require("express");
const app = express();

require("./config/server.config")(app);
require("./config/hbs.config")(app);
require("./config/pets.config")(app);

