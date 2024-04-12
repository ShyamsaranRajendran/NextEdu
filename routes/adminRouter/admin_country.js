var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const flash = require('connect-flash');
var mongoose = require('mongoose'); 
const fs = require('fs');
const path = require('path');
//var auth = require('../config/auth');
//var  isAdmin= auth.isAdmin;
// Get country model
var Country = require('../../models/country.js'); // Assuming correct path and filename
const Storage= require('../../utils/CountryMulter.js')


router.get('/', function(req, res) {
    Country.find({}).sort({ sorting: 1 }).exec()
    .then(country => {
      res.render('admin/country', {
        country: country
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

// Get add category
router.get('/add-country', function(req, res) {
  var title = "";
  var slug = "";
  var desc="";
  var  time="";
  var image=""


  res.render('admin/add_country', {
    title: title,
    slug: slug,
    desc:desc,
    time:time,
    image:image

  });

});

// Post add-country
router.post('/add-country', Storage.single('image'), [
    check('title', 'Title must not be empty').not().isEmpty(),
    check('time', 'Time must not be empty').not().isEmpty(),
  ], function(req, res) {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      // If there are validation errors, render the form again with error messages
      res.render('admin/add_country', {
        errors: errors.array(),
        title: req.body.title,
        slug: req.body.title.toLowerCase(), // Convert title to lowercase
        desc: req.body.desc,
        time: req.body.time,
        image: req.body.image
      });
    } else {
      // If validation passes, proceed with your logic
      Country.findOne({ slug: req.body.slug })
        .then(foundcountry => {
          if (foundcountry) {
            req.flash('danger', 'country slug exists, choose another.');
           res.redirect('/admin/countries'); // Assuming a redirect to the countrys route
          } else {
            var newCountry = new Country({
              title: req.body.title,
              slug: req.body.title.toLowerCase(), // Convert title to lowercase
              desc: req.body.desc,
              time: req.body.time,
              image: req.file ? req.file.path.replace('public/', '') : '' 
             });
  
            newCountry.save()
              .then(() => {
                Country.find({}).sort({ sorting: 1 }).exec()
                  .then(countrys => {
                    res.app.locals.country = countrys;
                  })
                  .catch(err => {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                  });
  
                req.flash('success', 'country added.');
               res.redirect('/admin/countries'); // Assuming a redirect to the countrys route
              })
              .catch(err => {
                console.log("Error:", err);
                req.flash('danger', 'Error adding country.');
               res.redirect('/admin/countries'); // Assuming a redirect to the countrys route
              });
          }
        })
        .catch(err => {
          console.log("Error:", err);
          req.flash('danger', 'Error checking country existence.');
         res.redirect('/admin/countries'); // Assuming a redirect to the countrys route
        });
    }
  });


//Delete
router.get('/delete-country/:id', function(req, res) {
  Country.findOneAndDelete({ _id: req.params.id })
    .exec()
    .then(deletedcountry => {
      if (deletedcountry) {
        // Construct the absolute path to the image file
        const imagePath = path.join(__dirname, '..', 'public/', deletedcountry.image);

        // Check if the file exists and delete it
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }

        // Update the list of countrys after deletion
        Country.find({}).sort({ sorting: 1 }).exec()
          .then(countrys => {
            res.app.locals.country = countrys;
          })
          .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
          });

        req.flash('success', 'country deleted');
      } else {
        req.flash('error', 'country not found');
      }
      res.redirect('/admin/countries');
    })
    .catch(err => {
      console.error(err);
      req.flash('error', 'Failed to delete country');
      res.redirect('/admin/countries');
    });
});


// Exports
module.exports = router;
