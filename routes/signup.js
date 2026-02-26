const express= require("express");

const router = express.Router({mergeParams:true});
const User = require("../models/users");

const passport=require("passport");

router.get("/signup",(req,res)=>{
  res.render("users/signup.ejs");
})

router.post("/signup",async(req,res)=>{
  let {email,username,password} = req.body;

  let newuser = new User ({email,username});

  let registeruser = await User.register( newuser, password);

console.log(registeruser);

  res.redirect("/listings");
})


router.get("/login",(req,res)=>{
  res.render("users/login.ejs");
})

router.post("/login",passport.authenticate("local", { failureRedirect: "/login", failureFlash:"true",})

  ,async(req,res)=>{
  req.flash("added","welcome to air bnb ");
  res.redirect("/listings");
})


module.exports= router;