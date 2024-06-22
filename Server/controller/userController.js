const userModel = require("../model/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    } else if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    } else if (!password || !confirmPassword) {
      return res.status(400).json({ error: "Password required" });
    } else if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const exists = await userModel.findOne({ email: email });
    if (exists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({ email, password: encryptedPassword });

    const token = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET_KEY);

    res.cookie("token", token, {
      httpOnly: true,
    }).status(200).json({ success: true, message: "User created successfully", user: user });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    } else if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET_KEY);



    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false, // Should be false for HTTP
      sameSite: 'Lax', // Use Lax for better compatibility over HTTP
      maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
    }).status(200).json({ success: true, message: "Login successful", user: user });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  console.log("logging out");
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: false, // Should be true if using HTTPS
    sameSite: 'Lax' // Adjust to your setup
  }).status(200).json({ success: true, message: "Logout successful" });
};

module.exports = { register, login ,logout};