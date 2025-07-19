const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Controller
exports.register = async (req, res) => {
  try {
    const { name, usermail, password, branch, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ usermail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      usermail,
      password: hashedPassword,
      branch,
      role,
    });

    await user.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { usermail, password } = req.body;

    // Find user
    const user = await User.findOne({ usermail });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "yoursecretkey",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        usermail: user.usermail,
        branch: user.branch,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};