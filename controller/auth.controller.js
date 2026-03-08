const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user.js")
require("dotenv").config();

const register = async (req,res)=>{
    const {username , password} = req.body;
    const hashedpassword = await bcrypt.hash(password,10);
    if(!password){
        return res.status(400).json({error : "Required Password"});
    }
    try{
        const newUser = await User.create({
        username,
        password: hashedpassword
    });
    }
    catch(err){
        res.status(400).json({error : err.message});
    }
    
    
    res.status(201).json({'User' : username , message: "User added Successfully "});
    
};

const login = async (req,res)=>{
    const {username , password} = req.body;
    const user = await User.findOne({username});

    if(!user){ 
        return res.status(404).json({error:"User Not Found"})
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(404).json({error:"Password Incorrect"});
    }
    
    const token = jwt.sign({userId:user._id,username : user.username},SECRET_KEY, {expiresIn: "1m"} );

    res.status(200).json({
        message:"Login Successful",
        token : token
    });

};


module.exports = {register, login};