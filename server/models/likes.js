var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var likesSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  like: {
    type: String,
    default: 0
  },
  dislike: {
    type: Number,
    default: 0
  },
  users: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});


var Likes = mongoose.model('likes', likesSchema);

module.exports = Likes;