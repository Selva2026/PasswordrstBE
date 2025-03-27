import User from '../Schemas/userschema.js';
import bcrypt from 'bcrypt';

const registerPage = async (req, res)=>{
try {
    const { name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
    res.status(200).json({message: "User added successfully", data: newUser});
} catch (error) {
    res.status(500).json({ error: error.message });

}
}
export default registerPage; 


export const loginPage = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found Please Register User" });
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
            return res.status(400).json({ message: "Invalid Password , Please try Forget Password" });

       

        res
          .status(200)
          .json({
            message: "User logged in successfully"
          });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }