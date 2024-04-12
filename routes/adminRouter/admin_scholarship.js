var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const flash = require('connect-flash');
var mongoose = require('mongoose'); 
const fs = require('fs');
const path = require('path');
//var auth = require('../config/auth');
//var  isAdmin= auth.isAdmin;
// Get Scholarship model
var Scholarship = require('../../models/scholarship.js'); // Assuming correct path and filename
const Storage= require('../../utils/ScholarshipMulter.js')


router.get('/', function(req, res) {
    Scholarship.find({}).sort({ sorting: 1 }).exec()
    .then(scholar => {
      res.render('admin/scholarship', {
        scholar: scholar
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

// Get add category
router.get('/add-scholarship', function(req, res) {
  var title = "";
  var slug = "";
  var desc="";
  var  time="";
  var image=""


  res.render('admin/add_scholarship', {
    title: title,
    slug: slug,
    desc:desc,
    time:time,
    image:image

  });

});

// Post add-scholarship
router.post('/add-scholarship', Storage.single('image'), [
    check('title', 'Title must not be empty').not().isEmpty(),
    check('time', 'Time must not be empty').not().isEmpty(),
  ], function(req, res) {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      // If there are validation errors, render the form again with error messages
      res.render('admin/add_scholarship', {
        errors: errors.array(),
        title: req.body.title,
        slug: req.body.title.toLowerCase(), // Convert title to lowercase
        desc: req.body.desc,
        time: req.body.time,
        image: req.body.image
      });
    } else {
      // If validation passes, proceed with your logic
      Scholarship.findOne({ slug: req.body.slug })
        .then(foundScholarship => {
          if (foundScholarship) {
            req.flash('danger', 'Scholarship slug exists, choose another.');
            res.redirect('/admin/scholarships'); // Assuming a redirect to the scholarships route
          } else {
            var newScholarship = new Scholarship({
              title: req.body.title,
              slug: req.body.title.toLowerCase(), // Convert title to lowercase
              desc: req.body.desc,
              time: req.body.time,
              image: req.file ? req.file.path.replace('public/', '') : '' 
             });
  
            newScholarship.save()
              .then(() => {
                Scholarship.find({}).sort({ sorting: 1 }).exec()
                  .then(scholars => {
                    res.app.locals.scholar = scholars;
                  })
                  .catch(err => {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                  });
  
                req.flash('success', 'Scholarship added.');
                res.redirect('/admin/scholarships'); // Assuming a redirect to the scholarships route
              })
              .catch(err => {
                console.log("Error:", err);
                req.flash('danger', 'Error adding scholarship.');
                res.redirect('/admin/scholarships'); // Assuming a redirect to the scholarships route
              });
          }
        })
        .catch(err => {
          console.log("Error:", err);
          req.flash('danger', 'Error checking scholarship existence.');
          res.redirect('/admin/scholarships'); // Assuming a redirect to the scholarships route
        });
    }
  });


//Delete
router.get('/delete-scholarship/:id', function(req, res) {
  Scholarship.findOneAndDelete({ _id: req.params.id })
    .exec()
    .then(deletedScholarship => {
      if (deletedScholarship) {
        // Construct the absolute path to the image file
        const imagePath = path.join(__dirname, '..', 'public/', deletedScholarship.image);

        // Check if the file exists and delete it
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }

        // Update the list of scholarships after deletion
        Scholarship.find({}).sort({ sorting: 1 }).exec()
          .then(scholarships => {
            res.app.locals.scholarships = scholarships;
          })
          .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
          });

        req.flash('success', 'Scholarship deleted');
      } else {
        req.flash('error', 'Scholarship not found');
      }
      res.redirect('/admin/scholarships');
    })
    .catch(err => {
      console.error(err);
      req.flash('error', 'Failed to delete scholarship');
      res.redirect('/admin/scholarships');
    });
});


// Exports
module.exports = router;
