const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {

  const idToken =
    req.body.idToken || req.query.idToken || req.headers["x-access-token"];

  if (!idToken) {
    return res.status(403).json({err: "A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(idToken, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
