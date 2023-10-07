const mongoose = require('mongoose');

const { Schema } = mongoose;

const wishlistSchema = new Schema({
  user_id:{type:Schema.Types.ObjectId,ref:'User'},
  destinations: [{ type: Schema.Types.ObjectId,}],
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;