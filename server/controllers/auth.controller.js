const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDES)
    );

    user = new User({ name, email, password: hashed, role });
    await user.save();

    res
      .status(201)
      .json({ msg: "User registered successfully. Please login." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Interval server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      msg: "Logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Interval server error" });
  }
};

module.exports = { register, login };
