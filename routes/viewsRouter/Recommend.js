const express = require('express');
const router = express.Router();
const Content_Category = require('../../models/con_category.js');
const Recommendation = require('../../models/recommondation.js'); // Corrected model name
const Program = require('../../models/programs.js'); // Import the Program model

router.get('/', async function (req, res) {
    try {
        const programs = await Program.find();
        const contentCategories = await Content_Category.find();
        const recommendations = await Recommendation.find();

        // Extract unique values of place and program from recommendations
        const places = [...new Set(recommendations.map(recommendation => recommendation.place))];
        const programsInRecommendation = [...new Set(recommendations.map(recommendation => recommendation.program))];

        // Filter content categories based on places or programs from recommendations
        const filteredCategories = contentCategories.filter(category => {
            return places.includes(category.location) || programsInRecommendation.includes(category.programs);
        });

        res.render('common/recommend', {
            programs: programs,
            contentCategories: filteredCategories,
            recommendations: recommendations,
            index: 0
        });
        
    } catch (error) {
        console.error('Error finding data:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
