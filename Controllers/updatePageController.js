import User from '../Schemas/userschema.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const updatePage = async (req, res)=>{

 

      const {token, password, cnfpassword} = req.body;
        if (!token) {
            return res.status(401).json({ message: "Token is missing!" });
          }
          try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user2 = decoded;
          
            const userx = await User.findById(req.user2._id);
        
            if (password !== cnfpassword) {
              return  res.status(500).json({message: "Passwords didn't Match"});
            }else{
                const hashedPassword = await bcrypt.hash(password, 10);
                const updateUser = await User.findByIdAndUpdate(
                    userx._id,
                    { password : hashedPassword },
                    { new: true }
                  );
               
            res.status(200).json({message: "Password Changed successfully", data: updateUser});

             
            }
            
          } catch (error) {
            res.status(500).json({ message: `Invalid Token, Internal server error` });
          }
      
  }
  export default updatePage;