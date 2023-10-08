const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Bookmark = require("../models/bookmark");
const Destination = require('../models/destination');
addToBookmark = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Access denied. Token missing." });
    }
    const decoded = jwt.verify(token, process.env.JWTTOKEN);
    const bookmark = await Bookmark({
      user_id: new mongoose.Types.ObjectId(decoded._id),
      destination_id: new mongoose.Types.ObjectId(req.body.destination_id),
      attraction_id: new mongoose.Types.ObjectId(req.body.attraction_id),
      isDestination: req.body.isDestination,
    });
    var r = await bookmark.save();
    res.status(200).json({
      data: r,
      message: "Success",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      data: e,
      message: "Error",
    });
  }
};

addToBookmarkAttraction = async (req, res) => {
  try {
    console.log("aaa");
const token = req.header("Authorization").replace("Bearer ", "");
if (!token) {
  return res.status(401).json({ error: "Access denied. Token missing." });
}
const decoded = jwt.verify(token, process.env.JWTTOKEN);
const destination = await Destination.findOne({
  _id: new mongoose.Types.ObjectId(req.body.destinationId),
});
console.log(destination);
destination.attractions.forEach(e=>{
  if(e._id.toString()==req.body.attractionId){
    e.bookmarked_by.push(decoded._id);
  }
})
console.log(destination);
const dest  = await Destination.findOneAndUpdate({
  _id: destination._id,
  attractions:destination.attractions
});
const d = await Destination.findById(destination._id);
res.status(200).json({
  data:d,
  message:"Success",
})
  }catch(e){
    console.log(e);
    res.status(500).json({
      data:"Error",
      message:"Error",
    })
  }
};

removeFromBookmarkAttraction = async (req, res) => {
  try {
const token = req.header("Authorization").replace("Bearer ", "");
if (!token) {
  return res.status(401).json({ error: "Access denied. Token missing." });
}
const decoded = jwt.verify(token, process.env.JWTTOKEN);
const destination = await Destination.findOne({
  _id: new mongoose.Types.ObjectId(req.body.destinationId),
});
console.log(destination);
destination.attractions.forEach(e=>{
  if(e._id.toString()==req.body.attractionId){
    e.bookmarked_by.pop(decoded._id);
  }
})
console.log(destination);
const dest  = await Destination.findOneAndUpdate({
  _id: destination._id,
  attractions:destination.attractions
});
const d = await Destination.findById(destination._id);
res.status(200).json({
  data:d,
  message:"Success",
})
  }catch(e){
    res.status(500).json({
      data:"Error",
      message:"Error",
    })
  }
};

removeFromBookmark = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Access denied. Token missing." });
    }
    const decoded = jwt.verify(token, process.env.JWTTOKEN);
    const bookmark = await Bookmark.findByIdAndDelete(req.body.id);
    res.status(200).json({
      data: "Deleted bookmark",
      message: "Success",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      data: e,
      message: "Error",
    });
  }
};
getMyBookmark = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Access denied. Token missing." });
    }
    const decoded = jwt.verify(token, process.env.JWTTOKEN); // Replace with your secret key
    const bookmark = await Bookmark.find({
      user_id: new mongoose.Types.ObjectId(decoded._id),
    });
    const destinationIds = [...new Set(bookmark.map(item => item.destination_id))];
    const attractionIds = [...new Set(bookmark.map(item=>item.attraction_id.toString()))];
 
    // Query the Destination collection for the destinations
   var dest =await  Destination.find({ _id: { $in: destinationIds } });
   var k=[]; 
   dest.forEach(element => {
    element.attractions.forEach(e=>{
      
      if(attractionIds.includes(e._id.toString())){
        console.log(e);
        k.push(e);
      }
    });
  });

  console.log(k);
    if (bookmark != null) {
      res.status(200).json({
        destination: dest,
        attraction:k,
        message: "Success",
      });
    } else {
      res.status(200).json({
        data: [],
        message: "Success",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      data: e,
      message: "Error",
    });
  }
};


module.exports = {
  addToBookmark,
  removeFromBookmark,
  getMyBookmark,
  addToBookmarkAttraction,
  removeFromBookmarkAttraction
};
