import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';

import connectDB from './Databse/config.js';
import router from './Routers/router.js';



dotenv.config();

const app=express();
const port = process.env.PORTID;
app.use(cors());
app.use(express.json());


connectDB();

app.use("/api",router);
app.use("/", (req,res)=>{
    res.send("Welcome to my API");
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})