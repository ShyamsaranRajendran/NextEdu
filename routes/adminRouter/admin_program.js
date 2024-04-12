var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const flash = require('connect-flash');
//var auth = require('../config/auth');
//var  isAdmin= auth.isAdmin;
// Get Program model
var Program = require('../../models/programs.js'); // Assuming correct path and filename

router.get('/', function(req, res) {
  Program.find({}).sort({ sorting: 1 }).exec()
    .then(programs => {
      res.render('admin/programs', {
        programs: programs
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

// Get add Program

router.get('/add-Program', function(req, res) {
  var title = "";
  var slug = "";
  var place = "";

  res.render('admin/add_program', {
    title: title,
    slug: slug,
    place: place
  });
});

// Post add-Program
router.post('/add-program', [
    check('title', 'Title must not be empty').not().isEmpty()
  ], function(req, res) {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      // If there are validation errors, render the form again with error messages
      res.render('admin/add_Program', {
        errors: errors.array(),
        title: req.body.title,
        slug: req.body.slug,
        place: req.body.place
      });
    } else {
      // If validation passes, proceed with your logic
      Program.findOne({ slug: req.body.slug })
        .then(foundProgram => { // Rename the variable to foundProgram
          if (foundProgram) {
            req.flash('danger', 'Program slug exists, choose another.');
            res.redirect('/admin/Programs'); // Assuming a redirect to the Programs route
          } else {
            var newProgram = new Program({
              title: req.body.title,
              slug: req.body.slug,
              place: req.body.place,
              sorting: 100
            });
  
            newProgram.save()
              .then(() => {
                Program.find({}).sort({ sorting: 1 }).exec() // Remove the callback function from exec()
                .then(Programs => {
                  res.app.locals.Programs = Programs;
                })
                .catch(err => {
                  console.error(err);
                  res.status(500).send('Internal Server Error');
                });
  
                req.flash('success', 'Program added.');
                res.redirect('/admin/Programs'); // Assuming a redirect to the Programs route
              })
              .catch(err => {
                console.log("Error:", err);
                req.flash('danger', 'Error adding Program.');
                res.redirect('/admin/Programs'); // Assuming a redirect to the Programs route
              });
          }
        })
        .catch(err => {
          console.log("Error:", err);
          req.flash('danger', 'Error checking Program existence.');
          res.redirect('/admin/Programs'); // Assuming a redirect to the Programs route
        });
    }
  });
  
// Delete Program
router.get('/delete-Program/:id',function(req, res) {
  Program.findOneAndDelete({ _id: req.params.id })
    .exec()
    .then(deletedProgram => {
      if (deletedProgram) {
        Program.find({}).sort({ sorting: 1 }).exec() // Remove the callback function from exec()
        .then(Programs => {
          res.app.locals.Programs =Programs;
         })
        .catch(err => {
            console.error(err);
              res.status(500).send('Internal Server Error');
            });
        req.flash('success', 'Program deleted');
      } else {
        req.flash('error', 'Program not found');
      }
      res.redirect('/admin/Programs');
    })
    .catch(err => {
      console.error(err);
      req.flash('error', 'Failed to delete Program');
      res.redirect('/admin/Programs');
    });
});



// Exports
module.exports = router;
