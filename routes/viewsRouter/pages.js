var express = require('express');
var router = express.Router();
// Get Program model
var Program = require('../../models/programs.js');
var Category= require('../../models/program-category.js');
var Scholarship = require('../../models/scholarship.js');
var Country = require('../../models/country.js');
var Content_Category = require('../../models/con_category.js'); // Assuming correct path and filename



router.get('/', async function (req, res) {
    try {
        const programs = await Program.find();
        const categorys = await Category.find();
        const scholarship = await Scholarship.find();
        const country = await Country.find();
        if (!programs) {
            return res.status(404).send('Programs not found');
        }

        res.render('common/index', {
            programs: programs ,// Pass the programs array to the template
            categorys:categorys,
            scholarship:scholarship,
            country:country,
        });
        
    } catch (error) {
        console.error('Error finding Programs:', error);
        res.status(500).send('Internal Server Error');
    }
});

/*
GET
*/
router.get('/all-category', async function (req, res) {
    try {
        // Fetch all categories
        const categorys = await Category.find();
        
        // Fetch all content categories
        let content_categorys;
        if (req.query.location || req.query.degree || req.query.mode) {
            // If query parameters are present, apply filtering
            const filter = {};
            if (req.query.location) filter.location = req.query.location;
            if (req.query.degree) filter.degree = req.query.degree;
            if (req.query.mode) filter.mode = req.query.mode;
            content_categorys = await Content_Category.find(filter);
        } else {
            // Otherwise, fetch all content categories
            content_categorys = await Content_Category.find();
        }

        // Render the view with the retrieved data
        res.render('common/all_category', {
            categorys: categorys,
            content_categorys: content_categorys,
            index:0
        });
    } catch (error) {
        console.error('Error finding Programs:', error);
        res.status(500).send('Internal Server Error');
    }
});



router.get('/category/details/:ID', async function (req, res) {
    try {
        const ID = req.params.ID;
        const content = await Content_Category.findById(ID);

        if (!content) {
            return res.status(404).send('Content not found');
        }

        res.render('common/details', {
            content: content
        });
    } catch (error) {
        console.error('Error finding content:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/GlobalFairTrade', async function (req, res) {
    try {
       
        res.render('common/GobalFairTrade', {
        
        });
    } catch (error) {
        console.error('Error finding content:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/scholarship', function(req, res){
    try{
  
        res.render('common/scholarship', {
        
        });
    }catch(err){
        console.error('Error finding content:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.get('/searcher', async function(req, res){
    try {
        const { studyDropdownSelect, placeDropdownSelect } = req.query; // Access query parameters
        
        // Query all categories
        const categorys = await Category.find();
        const programs = await Program.find();
      
        // Find content based on the selected course and place
        const content = await Content_Category.find({ programs: studyDropdownSelect, location: placeDropdownSelect });
        
        if (content) {
            // If content found, render the search result page with the found content and categories
            res.render('common/searchResult', {
                categorys: categorys,
                programs:programs,
                content_categorys: content,
                index:0,
      
            });
        } else {
            // If no content found, send a 404 response
            res.status(404).json({ success: false, message: 'Content not found for the specified course and place' });
        }
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});



router.get('/donation', function(req, res){
    try{
        res.render('common/donation', {
        
        });
    }catch(err){
        console.error('Error finding content:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.get('/Live-Meet', function(req, res){
    try{
        res.render('common/Meet', {
        
        });
    }catch(err){
        console.error('Error finding content:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.get('/entrance', function(req, res){
    try{
        res.render('common/entrance', {
        
        });
    }catch(err){
        console.error('Error finding content:', error);
        res.status(500).send('Internal Server Error');
    }
})


//Exports 
module.exports = router;
