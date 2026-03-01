const mongoose= require("mongoose");
const Listing = require("../models/listings");

const {data} = require("./data");

//mongoose connect 

const mongo_port= "mongodb://127.0.0.1:27017/airbnb";

async function main() { await mongoose.connect(mongo_port); }

main().then(()=>{console.log("mongo conn succesfull");}).catch((err)=>{console.log("error while connecting :",err);})


//async process vayeko vayera , aysnc function vitra haalera initialize gareko 
const initDB = async ()=>{
  await Listing.deleteMany({});

await Listing.insertMany(
  data.map(obj => ({ ...obj, owner: "69a1c99abb8a88ee9f074a15" }))
);

 
};

initDB();


//69a1c99abb8a88ee9f074a15