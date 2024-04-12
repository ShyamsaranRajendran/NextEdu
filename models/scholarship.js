var mongoose = require('mongoose');

// Scholarship schema
var ScholarshipSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    desc: {
        type: String,
       
    },
    time:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

var Scholarship = module.exports = mongoose.model('Scholarship', ScholarshipSchema);
