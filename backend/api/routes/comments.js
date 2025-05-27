const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const { authenticate, checkPermission } = require("../middleware/auth");

router.get("/", authenticate, checkPermission("read"), async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    console.error("Get comments error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", authenticate, checkPermission("write"), async (req, res) => {
  const { content } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ message: "Content is required" });
  }
  try {
    const comment = new Comment({
      content: content.trim(),
      user: req.user.id,
    });
    await comment.save();
    await comment.populate("user", "name");
    res.status(201).json(comment);
  } catch (error) {
    console.error("Create comment error:", error);
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
      const comment = await Comment.findById(id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      await Comment.findByIdAndDelete(id);
      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error("Delete comment error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
