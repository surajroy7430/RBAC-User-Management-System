const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({ total: users.length, users });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Interval server error" });
  }
};

const changeUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin", "moderator"].includes(role))
      return res.status(400).json({ msg: "Invalid role" });

    const user = await User.findByIdAndUpdate(id, { role }).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: "User role updated", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Interval server error" });
  }
};

module.exports = { getAllUsers, changeUserRole };
