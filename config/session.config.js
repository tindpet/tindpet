const session = require("express-session");
const MongoStore = require("connect-mongo");
const User = require("../models/user.model");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/tindpet";

module.exports.session = session({
  secret: process.env.SESSION_SECRET || "secretito",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.SESSION_SECURE === "true",
  },
  store: MongoStore.create({
    mongoUrl: MONGODB_URI,
    ttl: 7 * 24 * 60 * 60,
  }),
});

module.exports.loadSessionUser = (req, res, next) => {
  const { userId } = req.session;

  res.locals.noSession = userId === undefined;

  if (userId) {
    User.findById(userId)
      .then((user) => {
        req.user = user;
        res.locals.currentUser = user;
        res.locals.userProtector = user.role === "protector";
        next();
      })
      .catch((error) => next(error));
  } else {
    next();
  }
};
