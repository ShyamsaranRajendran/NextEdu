var mongoose = require('mongoose');

// Country schema
var CountrySchema = mongoose.Schema({
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

var Country = module.exports = mongoose.model('Country', CountrySchema);
