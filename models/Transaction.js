const mongoose = require("mongoose");


const TransactionSchema = new mongoose.Schema({

user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},


type:{
    type:String,
    enum:["Deposit","Withdraw"],
    required:true
},


amount:{
    type:Number,
    required:true
},


status:{
    type:String,
    default:"Pending"
},


createdAt:{
    type:Date,
    default:Date.now
}

});


module.exports = mongoose.model("Transaction", TransactionSchema);
