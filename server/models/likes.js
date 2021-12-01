var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var likesSchema = new Schema({
  url : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'url'
  },
  likeCount: {
    type: String,
    default: 0
  },
  dislikeCount: {
    type: Number,
    default: 0
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});


var Likes = mongoose.model('likes', likesSchema);

module.exports = Likes;