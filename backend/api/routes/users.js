const express = require("express");
const router = express.Router();
const Permission = require("../models/Permission");
const { authenticate } = require("../middleware/auth");

router.put("/permissions/:userId", authenticate, async (req, res) => {
  const { userId } = req.params;
  const { permissions } = req.body;
  try {
    let permission = await Permission.findOne({ user: userId });
    if (!permission) {
      permission = new Permission({ user: userId, permissions });
    } else {
      permission.permissions = permissions;
    }
    await permission.save();
    res.json({ message: "Permissions updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
