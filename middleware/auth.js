const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("AUTH HEADER:", authHeader);

  if (!authHeader) {
    return res.status(403).json({ msg: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1]; // ✅ IMPORTANT

    const decoded = jwt.verify(token, "secretkey");

    req.userId = decoded.id;

    next();
  } catch (err) {
    console.log("JWT ERROR:", err);
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = auth;