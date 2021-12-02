const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentsSchema = new Schema({
    url: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'url'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        default: '',
        required: true
    },
    like: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

var Comments = mongoose.model('comments', commentsSchema);

module.exports = Comments;