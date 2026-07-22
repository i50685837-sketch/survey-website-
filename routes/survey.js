const express = require("express");

const Survey = require("../models/Survey");
const User = require("../models/User");
const auth = require("../middleware/auth");


const router = express.Router();



// GET ALL SURVEYS

router.get("/all", auth, async(req,res)=>{

try{


const surveys = await Survey.find({
active:true
});


res.json(surveys);


}catch(error){

res.status(500).json({
message:error.message
});

}

});





// COMPLETE SURVEY

router.post("/complete/:id", auth, async(req,res)=>{


try{


const survey = await Survey.findById(req.params.id);


if(!survey){

return res.status(404).json({
message:"Survey not found"
});

}



const user = await User.findById(req.user);


// Add reward points

user.points += survey.reward;


await user.save();



res.json({

message:"Survey completed 🎉",

earned:survey.reward,

totalPoints:user.points

});


}catch(error){

res.status(500).json({
message:error.message
});

}


});



module.exports = router;
