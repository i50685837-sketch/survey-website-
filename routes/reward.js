const express = require("express");

const Reward = require("../models/Reward");
const User = require("../models/User");
const auth = require("../middleware/auth");


const router = express.Router();



// GET REWARD HISTORY

router.get("/history", auth, async(req,res)=>{

try{

const rewards = await Reward.find({
user:req.user
});


res.json(rewards);


}catch(error){

res.status(500).json({
message:error.message
});

}

});




// CLAIM REWARD

router.post("/claim", auth, async(req,res)=>{

try{


const user = await User.findById(req.user);


if(user.points <= 0){

return res.status(400).json({

message:"No points available"

});

}



// Move points to wallet

user.wallet += user.points;

const claimed = user.points;

user.points = 0;


await user.save();



const reward = new Reward({

user:user._id,

amount:claimed

});


await reward.save();



res.json({

message:"Reward claimed successfully 🎁",

amount:claimed,

wallet:user.wallet

});



}catch(error){

res.status(500).json({
message:error.message
});

}


});



module.exports = router;
