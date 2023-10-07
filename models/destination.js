const mongoose = require('mongoose');

const { Schema } = mongoose;

const attractionSchema = new Schema({
  name: String,
  description: String,
  images: [String],
  bookmarked_by: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const destinationSchema = new Schema({
  name: String,
  description: String,
  images: [String],
  attractions: [attractionSchema], 
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
