const express=require("express");
const router = express.Router();

const Listing= require("../models/listings");

const wrapAsync = require("../utils/asyncwrap");

const ExpressError= require("../utils/ExpressErros");

const {listingschema,reviewSchema} =require("../joischema");


const validatelisting = (req,res,next)=>{
  let result = listingschema.validate(req.body);
console.log(result);

if(result.error){
  let errmsg= result.error.details.map((el)=>el.message).join(",");
  throw new ExpressError(400,errmsg);
}
else{
  next();
}
}


//list all data 
router.get("/listings",wrapAsync(async(req,res)=>{
  let alllistings = await Listing.find({});
  res.render("listings/listall.ejs",{alllistings});

}))


//create new data 
router.get("/listings/create",(req,res)=>{
 
console.log("create form called");
 res.render("listings/create.ejs");
 
})


router.post("/listings",validatelisting,wrapAsync(async(req,res,next)=>{

let {title,price,location,country}= req.body;

await Listing.insertOne({title,price,location,country});

console.log("new data entered in database ");
res.redirect("/listings");
 
}))

//edit a data 
router.get("/listings/:id/edit",(req,res)=>{
let {id} =req.params;
console.log("edit form called");
 res.render("listings/edit.ejs",{id});
})

router.put("/listings/:id",wrapAsync(async(req,res)=>{
 
  let {id}= req.params;
  let {price,location,country}=req.body;
  await Listing.updateOne({_id:id},{$set:{price,location,country}}) ; 
  console.log("updated value");
  res.redirect(`/listings/${id}`);

}))


//delete 
router.delete("/listings/:id",wrapAsync(async(req,res)=>{
  console.log("inside delte route");
let {id}=req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}))

//yeslai last maa rakhya kinaki , yesma /listing paxi dynamic parameter xa 
//jasle aru normal /listing paxi ko paramter ko kaam kharab garxa
//view data 
router.get("/listings/:id",wrapAsync(async(req,res)=>{
  console.log("inside view");
  let {id}= req.params;
  let listed = await Listing.findOne({_id:id}).populate("reviews");

 res.render("listings/view.ejs",{listed});
}))




module.exports=router;