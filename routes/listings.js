const express=require("express");
const router = express.Router();

const Listing= require("../models/listings");

const wrapAsync = require("../utils/asyncwrap");

const ExpressError= require("../utils/ExpressErros");

const {listingschema,reviewSchema} =require("../joischema");
const { isLogin ,isOwner} = require("../authenticate");
const { populate } = require("../models/review");


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

// import from controllers 
const listingcontroller = require("../controllers/listings");

//list all data 
router.get("/listings",wrapAsync(listingcontroller.index))


//create new data 
router.get("/listings/create",isLogin,listingcontroller.renderNewForm);

//post new form in db 
router.post("/listings",isLogin,validatelisting,wrapAsync(listingcontroller.postNewForm));

//edit a data 
router.get("/listings/:id/edit",isLogin,listingcontroller.editListingForm);

router.put("/listings/:id",isOwner,wrapAsync(listingcontroller.editListingPut));


//delete 
router.delete("/listings/:id",isOwner,wrapAsync(listingcontroller.deleteListing));

//yeslai last maa rakhya kinaki , yesma /listing paxi dynamic parameter xa 
//jasle aru normal /listing paxi ko paramter ko kaam kharab garxa
//view data 
router.get("/listings/:id",wrapAsync(listingcontroller.viewListingDetail));




module.exports=router;