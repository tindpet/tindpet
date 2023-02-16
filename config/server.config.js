const express = require("express");
const logger = require("morgan");

const PORT = process.env.PORT;

module.exports = (app) => {
  app.use(logger("dev"));

  app.use(express.urlencoded({ extended: false }));

  app.use(express.static(`${__dirname}/../public`));

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};
