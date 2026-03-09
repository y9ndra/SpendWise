const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user.js")
require("dotenv").config();

const register = async (req,res)=>{
    
    try{
        const {username , password} = req.body;

        if(!username || !password){
            return res.status(400).json({message : "Username and Password are Required"});
        }
        if(password.lenght < 8){
            return res.status(400).json({message : "Password must be atleast 8 characters"});
        }

        const hashedpassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
        username,
        password: hashedpassword
    });

    res.status(201).json({'User' : username , message: "User added Successfully "});

    }
    catch(err){
        res.status(400).json({error : err.message});
    }
    
    

    
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
    
    const token = jwt.sign({userId:user._id,username : user.username},process.env.SECRET_KEY, {expiresIn: "15m"} );

    res.status(200).json({
        message:"Login Successful",
        token : token
    });
    
};


module.exports = {register, login};