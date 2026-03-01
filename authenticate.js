const Listing =require("./models/listings");

module.exports.isLogin= (req,res,next) =>{
   console.log(req.user);
   
  if (!req.isAuthenticated())
  {
    req.session.redirecturl = req.originalUrl ; 
    return res.redirect("/login");
  }
  next();
}

module.exports.saveredirecturl= (req,res,next) =>{

  if (req.session.redirecturl)
  {
   res.locals.redirecturl= req.session.redirecturl;
  }
  next();
}


module.exports.isOwner= async(req,res,next) =>{
  let {id} = req.params ;
  let listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.curruser._id)){
    return res.redirect(`/listings/${id}`);
  }
  
  next();
}