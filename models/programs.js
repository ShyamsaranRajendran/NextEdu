var mongoose = require('mongoose');

// Categories schema
var ProgramSchema = mongoose.Schema({

    title: {
        type: String,
    },
    place: {
        type: String,
    },
    slug: {
        type: String
    }
    
});

var Program = module.exports = mongoose.model('Program', ProgramSchema);
