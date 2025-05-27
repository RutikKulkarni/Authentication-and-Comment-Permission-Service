const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const { authenticate, checkPermission } = require("../middleware/auth");

router.get("/", checkPermission("read"), async (req, res) => {
  try {
    const comments = await Comment.find().populate("user", "name");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", authenticate, checkPermission("write"), async (req, res) => {
  const { content } = req.body;
  try {
    const comment = new Comment({
      content,
      user: req.user.id,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete(
  "/:id",
  authenticate,
  checkPermission("delete"),
  async (req, res) => {
    const { id } = req.params;
    try {
      await Comment.findByIdAndDelete(id);
      res.json({ message: "Comment deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
