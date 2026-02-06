const express = require("express");
const Blog = require("../models/Blog");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

// Get all blogs
router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

// Create blog (admin)
router.post("/", adminAuth, async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch {
    res.status(400).json({ msg: "Invalid blog data" });
  }
});

//Update blog
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(blog);
  } catch {
    res.status(400).json({ msg: "Update failed" });
  }
});

// Delete blog
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    console.log("DELETE BLOG ERROR:", err.message);
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
