const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/profile", auth, (req, res) => {
  res.json({
    msg: "User authenticated successfully",
    userId: req.userId
  });
});

module.exports = router;