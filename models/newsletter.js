const mongoose = require('mongoose');

// Define a schema for the newsletter sign-up data
const newsletterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    }
});

// Create a model using the schema
const NewsletterSubscriber = mongoose.model('NewsletterSubscriber', newsletterSchema);

module.exports = NewsletterSubscriber;
