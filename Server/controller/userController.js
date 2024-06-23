const userModel = require("../model/userModel");
const messageModel = require("../model/messageModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const turl = require('turl');

const register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    } else if (email.length > 30 ) {
      return res.status(400).json({ error: "enter A shorter Username" });
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

   
    const link = await turl.shorten( `${process.env.HOST_LINK}/sent/${email}`)

    const user = await userModel.create({ email, password: encryptedPassword ,link });

    const token = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET_KEY);

    res.cookie("token", token, {
      httpOnly: true,
      domain:process.env.HOST_LINK,
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
      domain:process.env.HOST_LINK,
      secure: true, // Should be false for HTTP
      sameSite: 'none', // Use Lax for better compatibility over HTTP
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
    domain:process.env.HOST_LINK,
    secure: true, // Should be true if using HTTPS
    sameSite: 'none' // Adjust to your setup
  }).status(200).json({ success: true, message: "Logout successful" });
};


const sendMessage = async (req, res) => {

  console.log(req.body);

  try {
    const { id } = req.params;
    const { msg } = req.body;
    console.log(msg);
    const user = await userModel.findOne({email:id});
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.message.push(msg);
    await user.save();
    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findOne({email:id});

    if (!user) {
      return res.status(404).json({success: false, error: "User not found" });
    }
    res.status(200).json({ success: true, user: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login ,logout,sendMessage,findUser};