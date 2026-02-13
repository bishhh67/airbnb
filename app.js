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
app.set("views",path.join(__dirname,"views","listings"));

//importing the model , collection
const Listing= require("./models/listings");


//data parsing 
app.use(express.urlencoded({extended:true}));


//method over ride 

const methodOverride= require("method-override");
app.use(methodOverride("_method"));


// routes 

app.get("/",(req,res)=>{
  res.send("welcome to your home");
})


//list all data 
app.get("/listings",async(req,res)=>{
  let alllistings = await Listing.find({});
  res.render("listall.ejs",{alllistings});

})


//create new data 
app.get("/listings/create",(req,res)=>{
  
console.log("create form called");
 res.render("create.ejs");
})


app.post("/listings",async(req,res)=>{
let {title,price,location,country}= req.body;

await Listing.insertOne({title,price,location,country});
console.log("new data entered in database ");
res.redirect("/listings");
})




//edit a data 
app.get("/listings/:id/edit",(req,res)=>{
let {id} =req.params;
console.log("edit form called");
 res.render("edit.ejs",{id});
})

app.put("/listings/:id",async(req,res)=>{
 
  let {id}= req.params;
  let {price,location,country}=req.body;
  await Listing.updateOne({_id:id},{$set:{price,location,country}}) ; 
  console.log("updated value");
  res.redirect(`/listings/${id}`);

})


//delete 
app.delete("/listings/:id",async(req,res)=>{
  console.log("inside delte route");
let {id}=req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
})

//yeslai last maa rakhya kinaki , yesma /listing paxi dynamic parameter xa 
//jasle aru normal /listing paxi ko paramter ko kaam kharab garxa
//view data 
app.get("/listings/:id",async(req,res)=>{
  console.log("inside view");
  let {id}= req.params;
  let listed = await Listing.findOne({_id:id});

 res.render("view.ejs",{listed});
})




const port=3000;
app.listen(port,()=>{
  console.log(`running on http://localhost:${port}/listings`);
})