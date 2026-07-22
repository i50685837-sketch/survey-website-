const mongoose = require("mongoose");


const SurveySchema = new mongoose.Schema({

title:{
    type:String,
    required:true
},


description:{
    type:String,
    required:true
},


reward:{
    type:Number,
    default:0
},


questions:{
    type:Number,
    default:5
},


active:{
    type:Boolean,
    default:true
},


createdAt:{
    type:Date,
    default:Date.now
}

});


module.exports = mongoose.model("Survey", SurveySchema);
