const express= require("express");

const router = express.Router({mergeParams:true});
const User = require("../models/users");

const passport=require("passport");
const { saveredirecturl } = require("../authenticate");

//for signup
router.get("/signup",(req,res)=>{
  res.render("users/signup.ejs");
})

router.post("/signup",saveredirecturl,async(req,res)=>{
  let {email,username,password} = req.body;
  let newuser = new User ({email,username});
  let registeruser = await User.register( newuser, password);

  console.log(registeruser);

  req.login(registeruser, (err)=>{
    if (err){
      return next(err);
    }
    
    res.redirect("/listings");
  })

})

//for login
router.get("/login",(req,res)=>{
  res.render("users/login.ejs");
})

router.post("/login",passport.authenticate("local", { failureRedirect: "/login", failureFlash:"true",})

  ,async(req,res)=>{
  req.flash("added","welcome to air bnb ");
  let redirecturl =res.locals.redirecturl || "/listings"
    res.redirect(redirecturl);
})


//logout 
router.get("/logout",(req,res,next)=>{

  req.logout((err)=>{
    if(err){
     return  next(err);
    }
    res.redirect("/login");
  })
})
module.exports= router;