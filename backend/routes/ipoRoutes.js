const express = require("express");
const router = express.Router();
const IPO = require("../models/Ipo");
const adminAuth = require("../middleware/adminAuth");

// ================= CREATE IPO =================
router.post("/", adminAuth, async (req, res) => {
  try {
    const ipo = await IPO.create(req.body);
    res.json(ipo);
  } catch (err) {
    res.status(500).json({ msg: "Creation failed" });
  }
});

// ================= GET BY ID =================
router.get("/:id", async (req, res) => {
  try {
    const ipo = await IPO.findById(req.params.id).populate("companyId");
    if (!ipo) return res.status(404).json({ msg: "IPO not found" });
    res.json(ipo);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ================= GET ALL =================
router.get("/", async (req, res) => {
  try {
    const data = await IPO.find().populate("companyId");
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ================= UPDATE =================
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const ipo = await IPO.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(ipo);
  } catch (err) {
    res.status(500).json({ msg: "Update failed" });
  }
});

// ================= DELETE =================
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await IPO.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ msg: "Deletion failed" });
  }
});

module.exports = router;
