const mongoosoe = require("mongoose");
const { type } = require("../joischema");


const reviewSchema = new mongoosoe.Schema({
  comment:String,
  rating:{ type:Number, min:1,max:5},
  createdAt: {type:Date, default: Date.now() },
})

const Review = mongoosoe.model("Review",reviewSchema);
module.exports = Review;