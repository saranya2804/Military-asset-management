const jwt = require('jsonwebtoken');
const SECRET = "mysecretkey";

module.exports = function(requiredRole) {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).send("No token");

    try {
      const decoded = jwt.verify(token, SECRET);

      if (decoded.role !== requiredRole) {
        return res.status(403).send("Access Denied");
      }

      req.user = decoded;
      next();

    } catch (err) {
      res.status(401).send("Invalid Token");
    }
  };
};