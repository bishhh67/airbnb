const mongoose=require("mongoose");
const { type } = require("../joischema");
const { ref } = require("joi");

const listingSchema = new mongoose.Schema({
title:{
  type:String,
  required:true,
},
image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default: "https://thumbs.dreamstime.com/b/friendship-girls-unsplash-generate-ai-290623910.jpg?w=768",
      set: (v) =>
        v === ""
          ? "https://thumbs.dreamstime.com/b/friendship-girls-unsplash-generate-ai-290623910.jpg?w=768"
          : v,
    },
  },
price:{
  type:Number,
},
location:{
  type:String,
},
country:{
  type:String,
},
reviews:[{
  type: mongoose.Schema.Types.ObjectId,
  ref:"Review",
}

]
});

const Listing = new mongoose.model("Listing",listingSchema);

module.exports= Listing;