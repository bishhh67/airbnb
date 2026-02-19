const express = require("express");
const app= express();

const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/setcookies",(req,res)=>{
  res.cookie("name","ramesh");
  res.cookie("age","55");
  res.send("cookie sent");
})

app.get("/",(req,res)=>{
  console.log(req.cookies);
  let {name=anonymous}= req.cookies;
  res.send(` hi ${name}`);
})


app.listen(3000,()=>{
  console.log("http://localhost:3000");
})