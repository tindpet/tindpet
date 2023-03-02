module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports.isProtector = (req, res, next) => {
  if (req.user && req.user.role === "protector") {
    next();
  } else {
    res.redirect("/login");
  }
};
