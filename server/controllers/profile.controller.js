const User = require("../models/user.model");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Interval server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updates = {};

    if (name) updates.name = name;
    if (email) updates.email = email;

    const user = await User.findByIdAndUpdate(req.user.id, updates).select(
      "-password"
    );
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: "User profile updated", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Interval server error" });
  }
};

module.exports = { getProfile, updateProfile };
