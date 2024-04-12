var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const flash = require('connect-flash');
//var auth = require('../config/auth');
//var  isAdmin= auth.isAdmin;
// Get Category model
var Category = require('../../models/program-category.js'); // Assuming correct path and filename

router.get('/', function(req, res) {
    Category.find({}).sort({ sorting: 1 }).exec()
    .then(categorys => {
      res.render('admin/category', {
        categorys: categorys
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

// Get add category

router.get('/add-category', function(req, res) {
  var title = "";
  var slug = "";
  var txt1="";
  var txt2="";
  var txt3="";
  var front=""

  res.render('admin/add_category', {
    title: title,
    slug: slug,
     txt1:txt1,
     txt2:txt2,
     txt3:txt3,
     front:front
  });

});

// Post add-category
router.post('/add-category', [
  check('title', 'Title must not be empty').not().isEmpty()
], function(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // If there are validation errors, render the form again with error messages
    res.render('admin/add_category', {
      errors: errors.array(),
      title: req.body.title,
      slug: req.body.title.toLowerCase(), // Convert title to lowercase
      txt1: req.body.txt1,
      txt2: req.body.txt2,
      txt3: req.body.txt3,
      front: req.body.front
    });
  } else {
    // If validation passes, proceed with your logic
    Category.findOne({ slug: req.body.slug })
      .then(foundcategory => { // Rename the variable to foundcategory
        if (foundcategory) {
          req.flash('danger', 'category slug exists, choose another.');
          res.redirect('/admin/category'); // Assuming a redirect to the categorys route
        } else {
          var newCategory = new Category({
            title: req.body.title,
            slug: req.body.title.toLowerCase(), // Convert title to lowercase
            txt1: req.body.txt1,
            txt2: req.body.txt2,
            txt3: req.body.txt3,
            front: parseInt(req.body.front),
          });

          newCategory.save()
            .then(() => {
              Category.find({}).sort({ sorting: 1 }).exec() // Remove the callback function from exec()
              .then(categorys => {
                res.app.locals.categorys = categorys;
              })
              .catch(err => {
                console.error(err);
                res.status(500).send('Internal Server Error');
              });

              req.flash('success', 'category added.');
              res.redirect('/admin/category'); // Asuming a redirect to the categorys route
            })
            .catch(err => {
              console.log("Error:", err);
              req.flash('danger', 'Error adding category.');
              res.redirect('/admin/category'); // Assuming a redirect to the categorys route
            });
        }
      })
      .catch(err => {
        console.log("Error:", err);
        req.flash('danger', 'Error checking category existence.');
        res.redirect('/admin/category'); // Assuming a redirect to the categorys route
      });
  }
});


// Delete category
router.get('/delete-category/:id', function(req, res) {
  Category.findOneAndDelete({ _id: req.params.id })
  .exec()
  .then(deletedcategory => {
      if (deletedcategory) {
          Category.find({}).sort({ sorting: 1 }).exec() // Use Category.find() instead of category.find()
          .then(categorys => {
              res.app.locals.categorys = categorys;
          })
          .catch(err => {
              console.error(err);
              res.status(500).send('Internal Server Error');
          });
          req.flash('success', 'Category deleted');
      } else {
          req.flash('error', 'Category not found');
      }
      res.redirect('/admin/category');
  })
  .catch(err => {
      console.error(err);
      req.flash('error', 'Failed to delete category');
      res.redirect('/admin/category');
  });
});



// Exports
module.exports = router;
