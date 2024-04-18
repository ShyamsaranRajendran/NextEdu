// Community model file (community.js)
var mongoose = require('mongoose');

var CommunitySchema = mongoose.Schema({
    username: {
        type: String,
    },
    desc: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    },
    course: {
        type: String,
    },
    slug: {
        type: String
       
    }
});

var Community = mongoose.model('Community', CommunitySchema);

module.exports = Community;
