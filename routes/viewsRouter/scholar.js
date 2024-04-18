var express = require('express');
var router = express.Router();
// Get Program models (assuming they are in the same directory)

var Scholarship = require('../../models/scholarship.js');


router.get('/:id', async function (req, res) {
    try {
         const scholarship1 = await Scholarship.findById(req.params.id);
         const scholarship = await Scholarship.find();
         
        if (!scholarship) {
            return res.status(404).send('Scholarship not found');
        }

        res.render('common/scholar', {
            scholarship1: scholarship1,
            scholarship:scholarship
           
        });
        
    } catch (error) {
        console.error('Error finding scholarship:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/scholarships', async function(req, res) {
    try {
          const scholarships = await Scholarship.find({}); // Find all
        res.render('common/scholarship', {
            scholarships: scholarships,
        });
    } catch (error) {
        console.error('Error finding scholarships:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Exports
module.exports = router;