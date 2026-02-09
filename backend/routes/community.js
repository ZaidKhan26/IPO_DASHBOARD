const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

router.post("/questions", auth, async (req, res) => {
  try {
    const q = await Question.create({
      ...req.body,
      author: req.user.name,
      userId: req.user.id,
    });
    res.json(q);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/questions", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [questions, totalCount] = await Promise.all([
      Question.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Question.countDocuments()
    ]);

    res.json({
      data: questions,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/questions/:id", async (req, res) => {
  try {
    const q = await Question.findById(req.params.id);
    if (!q) return res.status(404).json({ msg: "Not found" });
    const answers = await Answer.find({ questionId: req.params.id });
    res.json({ q, answers });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/answers", auth, async (req, res) => {
  try {
    const a = await Answer.create({
      ...req.body,
      author: req.user.name,
      userId: req.user.id,
    });
    await Question.findByIdAndUpdate(req.body.questionId, {
      $inc: { answers: 1 },
    });
    res.json(a);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.put("/questions/:id/upvote", auth, async (req, res) => {
  try {
    const q = await Question.findById(req.params.id);
    if (!q) return res.status(404).json({ msg: "Not found" });

    const upvotedBy = q.upvotedBy || [];
    const isUpvoted = upvotedBy.includes(req.user.id);

    if (isUpvoted) {
      await Question.findByIdAndUpdate(req.params.id, {
        $pull: { upvotedBy: req.user.id },
        $inc: { votes: -1 },
      });
    } else {
      await Question.findByIdAndUpdate(req.params.id, {
        $addToSet: { upvotedBy: req.user.id },
        $inc: { votes: 1 },
      });
    }

    const updatedQ = await Question.findById(req.params.id);
    res.json({ success: true, votes: updatedQ.votes });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/questions/:id", adminAuth, async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    await Answer.deleteMany({ questionId: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
