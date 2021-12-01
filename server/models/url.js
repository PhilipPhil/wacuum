import user from 'user'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var urlSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    comment: [commentsSchema],
});

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
    author: {user}
}, {
    timestamps: true
});



var Url = mongoose.model('url', urlSchema);

module.exports = Url;