const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose);

const deals2Schema = new Schema({
    company: {
        type: String,
        required: true
    },
    mainimage: {
        type: String,
        required: true
    },
    logoimage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fineprint: {
        type: String,
        default: ""
    },
    website: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postalcode: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Deals2 = mongoose.model('deals2', deals2Schema);

module.exports = Deals2;