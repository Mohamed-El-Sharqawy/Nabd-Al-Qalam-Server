require("dotenv").config();
const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check if json web token exists & verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.redirce("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirce("/login");
  }
};

module.exports = requireAuth;
