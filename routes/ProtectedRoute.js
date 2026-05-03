const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const HoldingsModel = require("../model/HoldingsModel");


router.get("/profile", auth, (req, res) => {
  res.json({
    msg: "User authenticated successfully",
    userId: req.userId
  });
});

router.get("/allHoldings", auth, async (req, res) => {
  try {
    console.log("API HIT /allHoldings");

    const holdings = await HoldingsModel.find();

    res.json(holdings);

  } catch (err) {
    console.log("HOLDINGS ERROR:", err);
    res.status(500).json({ msg: "Server error in holdings" });
  }
});

module.exports = router;