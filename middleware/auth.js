// const jwt = require("jsonwebtoken");

// const auth = (req, res, next) => {
//   // const token = req.headers["authorization"];
//    const authHeader = req.headers.authorization;
//    console.log("AUTH HEADER:", authHeader); // debug


//   if (!token) {
//     return res.status(403).json({ msg: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, "secretkey"); // same key as login

//     req.userId = decoded.id;
//     next();

//   } catch (err) {
//       console.log("JWT Error:", err);
//     return res.status(401).json({ msg: "Invalid token" });
//   }
// };

// module.exports = auth;
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("AUTH HEADER:", authHeader);

  if (!authHeader) {
    return res.status(403).json({ msg: "No token provided" });
  }

  // "Bearer TOKEN" format hota hai → split karo
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ msg: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, "secretkey");

    req.userId = decoded.id;
    next();

  } catch (err) {
    console.log("JWT Error:", err);
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = auth;