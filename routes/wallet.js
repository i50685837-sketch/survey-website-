const express = require("express");

const User = require("../models/User");
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");


const router = express.Router();



// GET WALLET

router.get("/balance", auth, async(req,res)=>{

const user = await User.findById(req.user);


res.json({

wallet:user.wallet,
points:user.points

});

});




// DEPOSIT

router.post("/deposit", auth, async(req,res)=>{

try{

const {amount}=req.body;


const transaction = new Transaction({

user:req.user,

type:"Deposit",

amount

});


await transaction.save();



res.json({

message:"Deposit request submitted 💰"

});


}catch(error){

res.status(500).json({
message:error.message
});

}

});




// WITHDRAW

router.post("/withdraw", auth, async(req,res)=>{


try{


const {amount}=req.body;


const user = await User.findById(req.user);



if(user.wallet < amount){

return res.status(400).json({

message:"Insufficient balance"

});

}



const transaction = new Transaction({

user:req.user,

type:"Withdraw",

amount

});


await transaction.save();



res.json({

message:"Withdraw request submitted 💸"

});



}catch(error){

res.status(500).json({

message:error.message

});

}


});





// TRANSACTION HISTORY

router.get("/transactions", auth, async(req,res)=>{


const history = await Transaction.find({

user:req.user

});


res.json(history);


});



module.exports = router;
