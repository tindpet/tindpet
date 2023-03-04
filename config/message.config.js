const express = require("express");
const routesMessage = express.Router();

const message = require("../controllers/message.controller");

routesMessage.get("/pets/:id/chat", message.list);
routesMessage.post("/pets/:id/chat", message.doCreate);

routesMessage.get("/new-message", message.checkMsg);

module.exports = routesMessage;
