const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Bookmark = require("../models/bookmark");

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
    if (bookmark != null) {
      res.status(200).json({
        data: bookmark,
        message: "Success",
      });
    } else {
      res.status(200).json({
        data: [],
        message: "Success",
      });
    }
  } catch (e) {
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
};
