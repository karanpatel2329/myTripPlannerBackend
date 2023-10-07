const express = require("express");
const router=new  express.Router();
const bookmarkController = require('../controllers/bookmarkController');
const auth = require("../middleware/middleware");

router.post("/add",auth,bookmarkController.addToBookmark);
router.post("/remove",auth,bookmarkController.removeFromBookmark);
router.get("/get",auth,bookmarkController.getMyBookmark);
module.exports=router;