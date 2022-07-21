const passport = require("passport");

module.exports = {
  local: (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, usuario, info) => {
      if (err && err.name === "InvalidArgumentError") {
        return res.status(401).json({ message: err.message });
      }
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (!usuario) {
        return res.status(401).json();
      }
      req.user = usuario;
      return next();
    })(req, res, next);
  },

  bearer: (req, res, next) => {
    passport.authenticate(
      "bearer",
      { session: false },
      (err, usuario, info) => {
        if (err && err.name === "JsonWebTokenError") {
          return res.status(401).json({ message: err.message });
        }
        if (err && err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ message: err.message, expiredAt: err.expiredAt });
        }
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        if (!usuario) {
          return res.status(401).json();
        }
        req.token = info.token;
        req.user = usuario;
        return next();
      }
    )(req, res, next);
  },
};
