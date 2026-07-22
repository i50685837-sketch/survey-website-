const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");


const app = express();

app.use(cors());
app.use(express.json());


// Connect database
connectDB();


// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/survey", require("./routes/survey"));
app.use("/api/reward", require("./routes/reward"));
app.use("/api/wallet", require("./routes/wallet"));


// Test API
app.get("/", (req,res)=>{
    res.json({
        message:"Survey Hub API Running 🚀"
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
