const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const adminAuth = require("../middleware/adminAuth");

router.delete("/:id", adminAuth, async (req, res) => {
  try {
    if (!require("mongoose").Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Invalid ID format" });
    }
    await Company.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (err) {
    console.error("Company Deletion Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/", adminAuth, async (req, res) => {
  try {
    const { name, logoUrl } = req.body;
    if (!name) return res.status(400).json({ msg: "Name is required" });

    const data = await Company.create({ name, logoUrl });
    res.json(data);
  } catch (err) {
    console.error("Company Creation Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Company.find();
    res.json(data);
  } catch (err) {
    console.error("Company Fetch Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
