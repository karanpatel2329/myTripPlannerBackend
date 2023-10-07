const express = require('express');
const router = express.Router();
const Destination = require('../models/destination'); // Import your Mongoose model

// Create a new destination
createDestination=async(req, res) => {
  try {
    const newDestination = new Destination(req.body);
    await newDestination.save();
    res.status(201).json(newDestination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get all destinations
getAllDestination = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a specific destination by ID
getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.query.id);
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update a destination by ID
updateDestinationByID = async (req, res) => {
  try {
    const updatedDestination = await Destination.findByIdAndUpdate(
        req.query.id,
      req.body,
      { new: true }
    );
    if (!updatedDestination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.json(updatedDestination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a destination by ID
deletedDestinationById =  async (req, res) => {
  try {
    const deletedDestination = await Destination.findByIdAndRemove(req.query.id);
    if (!deletedDestination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.json(deletedDestination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
    createDestination,
    getAllDestination,
    getDestinationById,
    updateDestinationByID,
    deletedDestinationById
};
