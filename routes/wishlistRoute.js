const express = require("express");
const router=new  express.Router();
const wishlistController = require('../controllers/wishlistController');
const auth = require("../middleware/middleware");
router.post("/addToWishlist",auth,wishlistController.addToWishlist);
router.post("/removeFromWishlist",auth,wishlistController.removeFromWishlist);
router.get("/myWishlist",auth,wishlistController.getMyWishlist);
module.exports=router;