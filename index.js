// express
const express = require("express");
const app = express();


//mongoose connect 
const mongoose=require("mongoose");

const mongo_port= "mongodb://127.0.0.1:27017/airbnb";

async function main() { await mongoose.connect(mongo_port); }

main().then(()=>{console.log("mongo conn succesfull");}).catch((err)=>{console.log("error while connecting :",err);})



// routes 

app.get("/",(req,res)=>{
  res.send("welcome to home");
})

const port=3000;
app.listen(port,()=>{
  console.log(`running on http://localhost:${port}`);
})