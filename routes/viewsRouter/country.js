var express = require('express');
var router = express.Router();
// Get Program models (assuming they are in the same directory)

var Country = require('../../models/country.js');


router.get('/:id', async function (req, res) {
  try {
      const country1 = await Country.findById(req.params.id);
      const country = await Country.find(); // Changed variable name to plural form

      if (!country1) { // Changed the check to use country1 instead of country
          return res.status(404).send('Country not found'); // Corrected error message
      }

      res.render('common/country', {
          country1: country1,
          country: country // Passed the correct variable to the template
      });
      
  } catch (error) {
      console.error('Error finding country:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Post add-country
router.post('/add-country', function(req, res) {
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
// Exports
module.exports = router;