const express = require("express");
const session = require("express-session");
const app= express();

app.use(session({secret:"mysecretcode",
  resave:false,
  saveUninitialized:true,
}));

app.get("/",(req,res)=>{
  
  res.send("session connected");
})

app.get("/countreq",(req,res)=>{
  if(req.session.count){
    req.session.count++

  }
  else{
    req.session.count=1
  }
  res.send(`you have send reqs= ${req.session.count} times in this same session `);
})

app.listen(3000,()=>{
  console.log("http://localhost:3000");
})