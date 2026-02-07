const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const crypto = require("crypto");

// HELPERS
const validEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || name.length < 2)
      return res.status(400).json({ msg: "Invalid name" });

    if (!validEmail(email))
      return res.status(400).json({ msg: "Invalid email format" });

    if (!password || password.length < 6)
      return res.status(400).json({ msg: "Password too short" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "User already exists" });

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hash,
    });

    res.json({ msg: "Account created." });
  } catch (err) {
    res.status(500).json({ msg: "Signup failed" });
  }
});

// ================= GOOGLE LOGIN =================
router.post("/google-login", async (req, res) => {
  try {
    const { idToken } = req.body;
    console.log("Google Login Request Received. ID Token Length:", idToken?.length);

    // Verify token with Firebase Identity Toolkit
    const firebaseRes = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FIREBASE_API_KEY}`,
      { idToken }
    );

    console.log("Firebase Token Verification Response:", firebaseRes.data);

    const userProfile = firebaseRes.data.users[0];
    const { email, displayName: name, emailVerified: email_verified } = userProfile;

    if (!email_verified) {
      console.log("Firebase Email Not Verified");
      return res.status(400).json({ msg: "Email not verified with Google/Firebase" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      const randomPassword = crypto.randomBytes(16).toString("hex");
      const hash = await bcrypt.hash(randomPassword, 10);

      user = await User.create({
        name: name,
        email: email,
        password: hash,
        provider: "google",
        isVerified: true,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    res.json({
      token,
      role: user.role,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("Google Login Error:", err.message);
    res.status(500).json({ msg: "Google Login failed" });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(401).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    res.json({
      token,
      role: user.role,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ msg: "Login failed" });
  }
});

// ================= FORGOT PASSWORD =================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const token = crypto.randomBytes(20).toString("hex");
    user.resetToken = token;
    user.resetExpire = Date.now() + 3600000;
    await user.save();

    res.json({ msg: "Reset link generated", token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
