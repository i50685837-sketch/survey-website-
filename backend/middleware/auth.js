const jwt = require("jsonwebtoken");


const auth = (req,res,next)=>{


try{


// Get token

const token = req.header("Authorization");


if(!token){

return res.status(401).json({
message:"No token provided"
});

}


// Remove Bearer

const cleanToken = token.replace("Bearer ","");


// Verify token

const decoded = jwt.verify(
cleanToken,
process.env.JWT_SECRET
);


// Add user ID

req.user = decoded.id;


next();


}catch(error){


res.status(401).json({

message:"Invalid token"

});


}


};


module.exports = auth;
