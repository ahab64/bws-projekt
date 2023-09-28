const jwt = require("jsonwebtoken");

const config = process.env; //enthält den Token key

const verifyToken = (req, res, next) => {

  const idToken =
    req.body.idToken || req.query.idToken || req.headers["x-access-token"]; //der Token wird benötigt um nach dem einloggen dir Funktionen zu benutzen

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
