const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ msg: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "secretkey"); // same key as login

    req.userId = decoded.id;
    next();

  } catch (err) {
      console.log("JWT Error:", err);
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = auth;