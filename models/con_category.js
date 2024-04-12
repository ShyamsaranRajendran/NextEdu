const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    university: {
        type: String,
        required: true
    },
    programs: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    deadline: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        required: true
    },
    admissions: {
        type: String,
        required: true
    },
    curriculum: {
        type: String
    },
    programOutcome: {
        type: String,
        required: true
    },
    tuition: {
        type: String,
        required: true
    },
    funding: {
        type: String,
        required: true
    },
    career: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    questions: {
        type: String,
        required: true
    }
});

const Content_Category = mongoose.model('Content_Category', categorySchema);

module.exports = Content_Category;
