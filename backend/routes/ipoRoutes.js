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

// ================= GET ALL (PAGINATED) =================
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
      IPO.find().populate("companyId").sort({ createdAt: -1 }).skip(skip).limit(limit),
      IPO.countDocuments()
    ]);

    res.json({
      data,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount
    });
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
