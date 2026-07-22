const express = require("express");

const User = require("../models/User");
const auth = require("../middleware/auth");


const router = express.Router();


// GET MY REFERRAL CODE

router.get("/code", auth, async(req,res)=>{


const user = await User.findById(req.user);


res.json({

referralCode:user.referralCode

});


});




// JOIN USING REFERRAL CODE

router.post("/join", auth, async(req,res)=>{


try{


const {code}=req.body;


const inviter = await User.findOne({

referralCode:code

});


if(!inviter){

return res.status(404).json({

message:"Invalid referral code"

});

}


// Update current user

const user = await User.findById(req.user);


user.invitedBy = inviter.referralCode;


await user.save();



res.json({

message:"Referral added successfully 🎉"

});



}catch(error){

res.status(500).json({

message:error.message

});

}

});




// VIEW INVITED FRIENDS

router.get("/friends", auth, async(req,res)=>{


const user = await User.findById(req.user);



const friends = await User.find({

invitedBy:user.referralCode

}).select("name phone");



res.json(friends);


});



module.exports = router;
