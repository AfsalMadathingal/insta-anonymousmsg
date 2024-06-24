const userModel = require("../model/userModel");
const messageModel = require("../model/messageModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const turl = require('turl');
const { validateUser, validateLogin } = require("../utils/validation");



const count = async (req, res) => {
  try {
    
    const totalUsers = await userModel.countDocuments();
    res.status(200).json({ totalUsers });


  } catch (error) {
    
  }
}


const removeMessage = async  (req, res) => {

  try {
   
    console.log(req.body);
    
    const { id, message } = req.body; 

    const result = await userModel.findOneAndUpdate(
      { _id: id },
      { $pull: { message: message } }
    );

    const user = await userModel.findById(id);

    console.log(result);

    if (!result) {
      return res.status(404).json({ success: false, message: 'Some error occurred' });
    }

    res.status(200).json({ success: true, message: 'Message removed successfully' ,user:user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } 
}



const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const error = validateUser(req.body)

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error[0] });
    }

    const exists = await userModel.findOne({ email: username });
    if (exists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

   
    const link = await turl.shorten( `${process.env.HOST_LINK}/sent/${username}`)

    const user = await userModel.create({ email:username.trim(), password: encryptedPassword ,link });

    const token = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET_KEY);

    res.cookie("token", token, {
      httpOnly: true,
      domain:process.env.HOST_LINK,
    }).status(200).json({ success: true, message: "User created successfully", user: user ,token:token});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const error = validateLogin(req.body)

    console.log(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error[0] });
    }

    const user = await userModel.findOne({ email: username });

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
      sameSite: 'None', // Use Lax for better compatibility over HTTP
      maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
    }).status(200).json({ success: true, message: "Login successful", user: user , token:token});

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
    sameSite: 'None' // Adjust to your setup
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

    console.log(id);

    const user = await userModel.findOne({email:id});

    if (!user) {
      return res.status(404).json({success: false, error: "User not found" });
    }
    res.status(200).json({ success: true, user: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login ,logout,sendMessage,findUser,count , removeMessage } ;