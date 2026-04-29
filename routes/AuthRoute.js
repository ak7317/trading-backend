const express = require("express");
const router = express.Router();
const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
router.post("/signup", async (req, res) => {
   console.log("SIGNUP HIT");   // ADD THIS
  console.log("BODY:", req.body); // ADD THIS
  try {
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({ msg: "Signup successful" });
  } catch (err) {
   if (err.name === "ValidationError") {
    return res.status(400).json({
      msg: Object.values(err.errors)[0].message,
    });
  }

  res.status(500).json({ msg: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "secretkey", {
      expiresIn: "1d",
    });

    res.json({ token, user });
  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;