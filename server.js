const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const  mongoose  = require("mongoose");
app.use(bodyparser.json());

require("dotenv").config();
const mongoUrl=process.env.MONGODB;
const router =require("./route")
app.use('/api',router)
mongoose.connect(mongoUrl).then(()=>{
    console.log("database connected");
    
}).catch((error)=>{
    console.log("something went wrong in  connecting database");
    
})

const PORT=process.env.PORT || 8000;
app.listen(process.env.PORT,()=>
{
    console.log(`Server started at Port:${PORT}`)
})