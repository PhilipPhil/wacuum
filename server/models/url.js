const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var urlSchema = new Schema({
    urlname: {
        type: String,
        required: true,
        unique: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }]
});

var Url = mongoose.model('url', urlSchema);

module.exports = Url;