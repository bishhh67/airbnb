const express = require("express");
const session = require("express-session");
const app= express();

app.use(session({secret:"mysecretcode",
  resave:false,
  saveUninitialized:true,
}));

app.get("/register",(req,res)=>{
  let {name="anonymous"}=req.query;
  req.session.name =name;
  res.send(name);
})

app.get("/sayhello",(req,res)=>{
  res.send(`hello ${req.session.name}`);
})

// app.get("/countreq",(req,res)=>{
//   if(req.session.count){
//     req.session.count++

//   }
//   else{
//     req.session.count=1
//   }
//   res.send(`you have send reqs= ${req.session.count} times in this same session `);
// })

app.listen(3000,()=>{
  console.log("http://localhost:3000");
})