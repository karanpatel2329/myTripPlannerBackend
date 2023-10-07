const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wishlist = require("../models/whitelist"); // Import your Mongoose model
const User = require("../models/user");
const Destination = require("../models/destination");
const jwt = require("jsonwebtoken");
// Create a new destination
addToWishlist = async (req, res) => {
    try {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }
  const decoded = jwt.verify(token, process.env.JWTTOKEN);
  const wishlist = await Wishlist.findOne({
    user_id: new mongoose.Types.ObjectId(decoded._id),
  });
  if (wishlist == null) {
    const wishlit = new Wishlist({
      user_id: decoded._id,
      destinations: req.body.destinations,
    });
    var a = await wishlit.save();
    res.status(200).json({
      data: a,
      message: "Success",
    });
  } else {
    var list = wishlist.destinations;
    if(list.includes(req.body.destinations)){
        res.status(201).json({
            data: wishlist,
            message: "Success but already added",
          });
    }else{
    list.push(new mongoose.Types.ObjectId(req.body.destinations));

    var re = await Wishlist.findByIdAndUpdate(
      wishlist._id,
      { destinations: list },
      { new: true }
    );
    res.status(200).json({
      data: re,
      message: "Success",
    });
  }
}
}catch(e){
  res.status(500).json({
    data: e,
    message: "Error",
  });
}
};
removeFromWishlist = async (req, res) => {
      try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Access denied. Token missing." });
    }
    const decoded = jwt.verify(token, process.env.JWTTOKEN); // Replace with your secret key
    const wishlist = await Wishlist.findOne({
      user_id: new mongoose.Types.ObjectId(decoded._id),
    });
    if (wishlist == null) {
      res.status(200).json({
        data: wishlist,
        message: "Success but already removed",
      });
    } else {
      var list = wishlist.destinations;
      if(list.includes(req.body.destinations)){
        list.pop(new mongoose.Types.ObjectId(req.body.destinations));
  
        var re = await Wishlist.findByIdAndUpdate(
          wishlist._id,
          { destinations: list },
          { new: true }
        );
        res.status(200).json({
          data: re,
          message: "Success",
        });
  
      }else{
        res.status(200).json({
            data: wishlist,
            message: "Success but already removed",
          });
          }
  }}catch(e){
    res.status(500).json({
      data: e,
      message: "Error",
    });
  }
  };
getMyWishlist = async(req,res)=>{
  try{
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Access denied. Token missing." });
    }
    const decoded = jwt.verify(token, process.env.JWTTOKEN); // Replace with your secret key
    const wishlist = await Wishlist.findOne({
        user_id: new mongoose.Types.ObjectId(decoded._id),
      });
      if (wishlist != null) {
        res.status(200).json({
          data: wishlist,
          message: "Success",
        });
      } else{
        res.status(200).json({
            data: [],
            message: "Success",
          });
      }
    }catch(e){
      res.status(500).json({
        data: e,
        message: "Error",
      });
    }
}  
module.exports = {
  addToWishlist,
  removeFromWishlist,
  getMyWishlist
};
