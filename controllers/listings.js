const Listing = require("../models/listings");

module.exports.index = async(req,res)=>{
  let alllistings = await Listing.find({});
  res.render("listings/listall.ejs",{alllistings});

};

module.exports.renderNewForm = (req,res)=>{
 
console.log("create form called");
 res.render("listings/create.ejs");
 
};

module.exports.postNewForm = async(req,res,next)=>{

let {title,price,location,country}= req.body;
let owner = req.user._id;
await Listing.insertOne({title,price,location,country,owner});

console.log("new data entered in database ");
req.flash("added","listing added success");
res.redirect("/listings");
 
};


module.exports.editListingForm = (req,res)=>{
let {id} =req.params;
console.log("edit form called");
 res.render("listings/edit.ejs",{id});
};


module.exports.editListingPut =async(req,res)=>{
 
  let {id}= req.params;
  let {price,location,country}=req.body;
  await Listing.updateOne({_id:id},{$set:{price,location,country}}) ; 
  console.log("updated value");
  res.redirect(`/listings/${id}`);

};


module.exports.deleteListing = async(req,res)=>{
  console.log("inside delte route");
let {id}=req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("deleted","listing delted");
  res.redirect("/listings");
};


module.exports.viewListingDetail = async(req,res)=>{
  console.log("inside view");
  let {id}= req.params;
  let listed = await Listing.findOne({_id:id}).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
  console.log(listed);
 res.render("listings/view.ejs",{listed});
};
