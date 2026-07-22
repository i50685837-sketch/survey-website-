const mongoose = require("mongoose");


const RewardSchema = new mongoose.Schema({

user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},


type:{
    type:String,
    default:"Survey Reward"
},


amount:{
    type:Number,
    default:0
},


status:{
    type:String,
    default:"Completed"
},


createdAt:{
    type:Date,
    default:Date.now
}

});


module.exports = mongoose.model("Reward", RewardSchema);
