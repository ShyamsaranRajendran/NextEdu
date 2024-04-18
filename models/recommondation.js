const mongoose = require('mongoose');

// Recommendation schema
const RecommendationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming userId is referencing the user model
        ref: 'User', // Reference to the User model
        required: true
    },
    college: {
        type: String,
        required: true
    },
    secondCollege: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    secondPlace: {
        type: String,
        required: true
    }
});

const Recommendation = mongoose.model('Recommendation', RecommendationSchema);

module.exports = Recommendation;


