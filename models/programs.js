var mongoose = require('mongoose');

// Categories schema
var ProgramSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    slug: {
        type: String
    }
    
});

var Program = module.exports = mongoose.model('Program', ProgramSchema);
