const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookmarkSchema = new Schema({
  user_id:{type:Schema.Types.ObjectId,ref:'User'},
  destination_id: { type: Schema.Types.ObjectId,},
  attraction_id: { type: Schema.Types.ObjectId,},
  isDestination:{type:Boolean}
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;