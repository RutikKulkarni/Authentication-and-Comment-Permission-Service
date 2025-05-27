const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const checkPermission = (permission) => async (req, res, next) => {
  const Permission = require("../models/Permission");
  try {
    const userPerm = await Permission.findOne({ user: req.user.id });
    if (!userPerm || !userPerm.permissions.includes(permission)) {
      return res
        .status(403)
        .json({ message: `Missing ${permission} permission` });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { authenticate, checkPermission };
