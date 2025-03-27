import mongoose from 'mongoose';
import dotenv from 'dotenv';



dotenv.config();

const connectDB = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.Mongo_URI)
        console.log("Connected to DB")
    
        
    } catch (error) {
        console.error(error)
        
    }
   
}
export default connectDB;