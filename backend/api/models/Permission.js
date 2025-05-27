const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  permissions: [{ type: String, enum: ["read", "write", "delete"] }],
});

module.exports = mongoose.model("Permission", permissionSchema);
