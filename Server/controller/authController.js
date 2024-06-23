const jwt = require("jsonwebtoken");
const userModal = require("../model/userModel");


  const verifyUser = async (req, res, next) => {
    
  
    try {
      
        const {token} = req.body;

      console.log(token);
  
      if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await userModal.findById(decoded.id);
      if(!user) return res.status(401).json({ success: false, message: "Unauthorized" });
      
      res.status(200).json({ success: true, user });  
  
    } catch (error) {
      console.log(error);
      return res.status(401).json({ success: false, message: "Unauthorized" });

    }
  };
  
  module.exports = { verifyUser }