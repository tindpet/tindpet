const hbs = require("hbs");

hbs.registerPartials(`${__dirname}/../views/partials`);

module.exports.setupHandlebars = (app) => {
  app.set("view engine", "hbs");
  app.set("views", `${__dirname}/../views`);
};
