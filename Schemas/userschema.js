import mongoose from "mongoose";

const userschema=mongoose.Schema({

    name : String,
    email: String,
    password: String

});

const User=mongoose.model("User",userschema);

export default User;