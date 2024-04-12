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
        const categorys = await Category.find();
        const  content_categorys = await Content_Category.find();
        res.render('common/all_category', {
             categorys:categorys,
             content_categorys:content_categorys,
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


//Exports 
module.exports = router;
