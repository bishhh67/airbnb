const express=require("express");
const router = express.Router({mergeParams:true});
const Listing= require("../models/listings");
const Review =require("../models/review");
const wrapAsync = require("../utils/asyncwrap");
const ExpressError= require("../utils/ExpressErros");
const {listingschema,reviewSchema} =require("../joischema");
const {isLogin, isReviewAuthor} = require("../authenticate");


const validateReview = (req,res,next)=>{
  let result = reviewSchema.validate(req.body);
console.log(result);

if(result.error){
  let errmsg= result.error.details.map((el)=>el.message).join(",");
  throw new ExpressError(400,errmsg);
}
else{
  next();
}
}

// review lai post  garne
router.post("/listings/:id/reviews",isLogin,validateReview,wrapAsync(async(req,res)=>{

  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);
  //listing vitra ko property ko reviews , so push garea haleko 
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  console.log("new review saved");
  res.send("new review save ");

}))

//delete review 

router.delete("/listings/:id/reviews/:reviewId",isLogin,isReviewAuthor, wrapAsync(async(req,res)=>{


  let {id, reviewId}=req.params;
  // yo review id , tei maathi route maa dekhinxa in line 43

  await Listing.findByIdAndUpdate(id, {$pull :{reviews: reviewId}}) ;
  await  Review.findByIdAndDelete(reviewId);

  console.log("review dleted ");
  res.redirect(`/listings/${id}`);
}) )

//hello wrold 
//hehe hoho hihihih

module.exports = router ;