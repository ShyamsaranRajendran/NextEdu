var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const flash = require('connect-flash');
//var auth = require('../config/auth');
//var  isAdmin= auth.isAdmin;
// Get Category model
var Content_Category = require('../../models/con_category.js'); // Assuming correct path and filename
const Storage= require('../../utils/CoursesMulter.js')
var Category = require('../../models/program-category.js'); // Assuming correct path and filename
var Program = require('../../models/programs.js');

router.get('/', function(req, res) {
    Content_Category.find({}).sort({ sorting: 1 }).exec()
    .then(content_categorys => {
      res.render('admin/con_category', {
        content_categorys: content_categorys
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

// Get add category
router.get('/add-con-category', async function(req, res) {

 var university = "";
var programs = "";
var location = "";
var degree = "";
var duration = "";
var mode = "";
var language = "";
var schedule = "";
var description = "";
var image = "";
var deadline = "";
var intro = "";
var admissions = "";
var curriculum = "";
var programOutcome = "";
var tuition = "";
var funding = "";
var career = "";
var school = "";
var questions = "";

const categorys = await Category.find();
const program = await Program.find();

  res.render('admin/add_con_category', {
    university: university,
    programs: programs,
    location: location,
    degree: degree,
    duration: duration,
    mode: mode,
    language: language,
    schedule: schedule,
    description: description,
    image: image,
    deadline: deadline,
    intro: intro,
    admissions: admissions,
    curriculum: curriculum,
    programOutcome: programOutcome,
    tuition: tuition,
    funding: funding,
    career: career,
    school: school,
    questions: questions,
    categories:categorys,
    program:program
    
  });

});

// Post add-category
router.post('/add-con-category', Storage.single('image'), [
  check('university').notEmpty().withMessage('University is required'),
  // Add other validation rules for each input field...
], async function(req, res) {
  try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).render('admin/add_con_category', {
              errors: errors.array(),
              university: req.body.university,
              programs: req.body.programs,
              location: req.body.location,
              degree: req.body.degree,
              duration: req.body.duration,
              mode: req.body.mode,
              language: req.body.language,
              schedule: req.body.schedule,
              description: req.body.description,
              image: req.file ? req.file.path.replace('public/', '') : '',
              deadline: req.body.deadline,
              intro: req.body.intro,
              admissions: req.body.admissions,
              curriculum: req.body.curriculum,
              programOutcome: req.body.programOutcome,
              tuition: req.body.tuition,
              funding: req.body.funding,
              career: req.body.career,
              school: req.body.school,
              questions: req.body.questions
          });
      }

      // If validation passes, proceed with saving the category
      const newContent_Category = new Content_Category({
          university: req.body.university,
          programs: req.body.programs,
          location: req.body.location,
          degree: req.body.degree,
          duration: req.body.duration,
          mode: req.body.mode,
          language: req.body.language,
          schedule: req.body.schedule,
          description: req.body.description,
          image: req.file ? req.file.path.replace('public/', '') : '',
          deadline: req.body.deadline,
          intro: req.body.intro,
          admissions: req.body.admissions,
          curriculum: req.body.curriculum,
          programOutcome: req.body.programOutcome,
          tuition: req.body.tuition,
          funding: req.body.funding,
          career: req.body.career,
          school: req.body.school,
          questions: req.body.questions
      });

      await newContent_Category.save()
      .then(() => {
          Content_Category.find({}).sort({ sorting: 1 }).exec()
              .then(categorys => {
                  res.app.locals.content_categorys = categorys;
                  req.flash('success', 'Category added.');
                  res.redirect('/admin/category/content'); // Redirect to the category route
              })
              .catch(err => {
                  console.error(err);
                  req.flash('danger', 'Error retrieving categories.');
                  res.redirect('/admin/category/content'); // Redirect to the category route
              });
      })
      .catch(err => {
          console.error(err);
          req.flash('danger', 'Error adding category.');
          res.redirect('/admin/category/content'); // Redirect to the category route
      });
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});

/*

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

*/

// Exports
module.exports = router;
