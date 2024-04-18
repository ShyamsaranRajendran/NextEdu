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
        
    },
    degree: {
        type: String,
        
    },
    duration: {
        type: String,
        
    },
    mode: {
        type: String,
        
    },
    language: {
        type: String,
        
    },
    schedule: {
        type: String,
        
    },
    description: {
        type: String,
        
    },
    image: {
        type: String,
        
    },
    deadline: {
        type: String,
        
    },
    intro: {
        type: String,
        
    },
    admissions: {
        type: String,
        
    },
    curriculum: {
        type: String
    },
    programOutcome: {
        type: String,
        
    },
    tuition: {
        type: String,
        
    },
    funding: {
        type: String,
        
    },
    career: {
        type: String,
        
    },
    school: {
        type: String,
        
    },
    questions: {
        type: String,
        
    }
});

const Content_Category = mongoose.model('Content_Category', categorySchema);

module.exports = Content_Category;
