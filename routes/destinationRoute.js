const express = require("express");
const router=new  express.Router();
const destinationController = require('../controllers/destinationController')
router.post("/create",destinationController.createDestination);
router.get("/getAll",destinationController.getAllDestination);
router.get("/get",destinationController.getDestinationById);
router.put("/get",destinationController.updateDestinationByID);
router.delete("/get",destinationController.deletedDestinationById);
module.exports=router;