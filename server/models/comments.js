const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentsSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        default: '',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

var Comments = mongoose.model('comments', commentsSchema);

module.exports = Comments;