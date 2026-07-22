const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// REGISTER USER
router.post("/register", async(req,res)=>{

try{

const {name, phone, password} = req.body;


// Check existing user

const existingUser = await User.findOne({phone});

if(existingUser){

return res.status(400).json({
message:"Phone number already registered"
});

}


// Encrypt password

const hashedPassword = await bcrypt.hash(password,10);


// Create referral code

const referralCode =
"MORDE" + Math.floor(1000 + Math.random()*9000);


// Save user

const user = new User({

name,

phone,

password:hashedPassword,

referralCode

});


await user.save();


res.json({

message:"Registration successful 🎉"

});


}catch(error){

res.status(500).json({
message:error.message
});

}

});




// LOGIN USER

router.post("/login", async(req,res)=>{

try{


const {phone,password}=req.body;


// Find user

const user = await User.findOne({phone});


if(!user){

return res.status(400).json({
message:"User not found"
});

}


// Check password

const match = await bcrypt.compare(
password,
user.password
);


if(!match){

return res.status(400).json({
message:"Wrong password"
});

}


// Create token

const token = jwt.sign(

{
id:user._id
},

process.env.JWT_SECRET,

{
expiresIn:"7d"
}

);



res.json({

message:"Login successful ✅",

token,

user:{
name:user.name,
wallet:user.wallet,
points:user.points
}

});


}catch(error){

res.status(500).json({
message:error.message
});

}


});


module.exports = router;
