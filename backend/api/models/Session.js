const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  refreshToken: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

module.exports = mongoose.model("Session", sessionSchema);
