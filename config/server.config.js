const express = require("express");
const logger = require("morgan");

const PORT = 3000;

module.exports = (app) => {
  app.use(logger("dev"));

  app.use(express.static(`${__dirname}/../public`));

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};
