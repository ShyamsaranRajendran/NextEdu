var mongoose = require('mongoose');

// Categories schema
var CategorySchema = mongoose.Schema({
    
    title:{
        type: String,
        required: true
    },

    txt1: {
        type: String,
        required: true
    },
    txt2: {
        type: String,
        required: true
    },
    txt3: {
        type: String,
        required: true
    },
    front:{
        type: Number,
        required: true
    },
    slug:{
        type: String,
        required: true
    }
    
});

var Category = module.exports = mongoose.model('Category', CategorySchema);
