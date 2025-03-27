import User from '../Schemas/userschema.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        };
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.log("Error sending email: ", error.message);
    }
};

// Reset password page logic
const resetPage = async (req, res) => {
    const { email } = req.body;

    // Check if the user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found. Please register." });
    }

    const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    )

    
    const resetLink = `https://passwordrts.netlify.app/updatepwr/${token}`;

    // Send the password reset email
    await sendEmail(
        email,
        "Password Reset Verification Email",
        `Click the link below to start the process of resetting your password: ${resetLink}`
    );

    return res.status(200).json({ message: 'Password reset email sent successfully' , token});
};

export default resetPage;
