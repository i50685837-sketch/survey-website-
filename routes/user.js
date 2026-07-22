const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();


// GET USER PROFILE

router.get("/profile", auth, async(req,res)=>{

try{

const user = await User.findById(req.user)
.select("-password");


res.json(user);


}catch(error){

res.status(500).json({
message:error.message
});

}

});




// UPDATE PROFILE

router.put("/profile", auth, async(req,res)=>{

try{

const {name}=req.body;


const user = await User.findByIdAndUpdate(

req.user,

{
name:name
},

{
new:true
}

);


res.json({

message:"Profile updated ✅",

user

});


}catch(error){

res.status(500).json({
message:error.message
});

}

});




// WALLET BALANCE

router.get("/wallet", auth, async(req,res)=>{


try{


const user = await User.findById(req.user);


res.json({

wallet:user.wallet,

points:user.points

});


}catch(error){

res.status(500).json({
message:error.message
});

}


});



module.exports = router;
