// express
const express = require("express");
const app = express();

//mongoose connect 
const mongoose=require("mongoose");

const mongo_port= "mongodb://127.0.0.1:27017/airbnb";

async function main() { await mongoose.connect(mongo_port); }

main().then(()=>{console.log("mongo conn succesfull");}).catch((err)=>{console.log("error while connecting :",err);})

//path 
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

//ejs mate
const ejsMate = require("ejs-mate");
app.engine("ejs",ejsMate);

//importing the model , collection
const Listing= require("./models/listings");
const wrapAsync = require("./utils/asyncwrap");
const ExpressError= require("./utils/ExpressErros");
const {listingschema,reviewSchema} =require("./joischema");
const session = require("express-session");
const flash = require("connect-flash");

//data parsing 
app.use(express.urlencoded({extended:true}));

//method over ride 
const methodOverride= require("method-override");
app.use(methodOverride("_method"));

//passport : 
const passport=require("passport");
const LocalStrategy = require("passport-local");
const User= require("./models/users");


//



const sessionOptions = {
  secret: "mysecretcode",
  resave:false,
  saveUninitialized:true,
  cookie: {
    expires: Date.now()+ 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly:true,
  }

}
// establishing session ra passport for authentication
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.added = req.flash("added");
   res.locals.deleted = req.flash("deleted");
   res.locals.curruser= req.user;
  next();
})




/////////
const listings= require("./routes/listings");
const reviews= require("./routes/reviews");
const signup = require("./routes/signup");
//////
app.use("/",listings);
app.use("/",reviews);
app.use("/",signup);




app.all(/.*/, (req, res, next) => {
  throw new ExpressError(404, "page not found");
});

app.use((err,req,res,next)=>{
  let {status=500,message=" default msg : something went wrong "}=err;
  res.status(status).render("listings/errors",{err});
  
});

const port=3000;
app.listen(port,()=>{
  console.log(`running on http://localhost:${port}/listings`);
})




// app.get("/registeruser",async(req,res)=>{

//   let fakeuser = new User({
//     email: "b63@gmail.com ", 
//     username: "bishh" ,
//   });
//   let newUser = await User.register(fakeuser, "mypass");
//   res.send(newUser);


// })