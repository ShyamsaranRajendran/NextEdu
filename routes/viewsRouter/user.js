const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User  = require('../../models/user.js');
var Program = require('../../models/programs.js');

// Route to register page
router.get('/register', async function(req, res) {
    try {
        const programs = await Program.find();
        res.render('entry/register', {
            title: 'Register',
            programs:programs
        });
    } catch (error) {
        console.error('Error rendering registration page:', error);
        res.status(500).send('Internal Server Error');
    }
});

const Recommendation = require('../../models/recommondation.js'); // Import the Recommendation model

router.post('/register', async function(req, res) {
    try {
        const { name, email, username, password, confirm_password, college, second_college, place, second_place } = req.body;

        // Check if passwords match
        if (password !== confirm_password) {
            req.flash('error', 'Passwords do not match');
            return res.redirect('/usr/register');
        }

        // Check if username already exists in the database
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            req.flash('error', 'Username already exists, choose another');
            return res.redirect('/usr/register');
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            name: name,
            email: email,
            username: username,
            password: hash,
            admin: 0
        });
        await newUser.save();

        // Store recommendations
        const newRecommendation = new Recommendation({
            userId: newUser._id, // Assuming userId field in recommendation model
            college: college,
            secondCollege: second_college,
            place: place,
            secondPlace: second_place
        });
        await newRecommendation.save();

        // Flash message for successful registration
        req.flash('success', 'You are now registered');
        res.redirect('/usr/login');
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'Internal Server Error');
        res.redirect('/usr/register');
    }
});


// Route to login page
router.get('/login', async function(req, res) {
    try {
        if (req.user) {
            // If user is already logged in, redirect to home page
            return res.redirect('/');
        }
        // Render login page
        res.render('entry/login', {
            title: 'Log In'
        });
    } catch (error) {
        console.error('Error rendering login page:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/login', function(req, res, next) {
    passport.authenticate('local', async function(err, user, info) {
        try {
            if (err) {
                console.error('Error authenticating user:', err);
                return next(err);
            }
            if (!user) {
                // If user is not found, redirect to login page with error message
                req.flash('error', 'Invalid username or password');
                return res.redirect('/usr/login');
            }
            req.logIn(user, function(err) {
                if (err) {
                    console.error('Error logging in user:', err);
                    return next(err);
                }
                // Store the username in the session
                req.session.username = user.username;
                // If login is successful, redirect to home page
                return res.redirect('/');
            });
        } catch (error) {
            console.error('Error authenticating user:', error);
            res.status(500).send('Internal Server Error');
        }
    })(req, res, next);
});




router.get('/logout', async function(req, res) {
    try {
       req.logout(function(err) {
           if (err) {
               console.error('Error logging out:', err);
               return res.status(500).send('Internal Server Error');
           }
           req.flash('success', 'You are logged out!');
           res.redirect('/usr/login');
       });
    } catch (error) {
        console.error('Error rendering login page:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
