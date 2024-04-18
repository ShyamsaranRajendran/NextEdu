var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const flash = require('connect-flash');
var mongoose = require('mongoose');

const NewsletterSubscriber = require('../../models/newsletter'); // Import the Mongoose model
const Mailer = require('../../utils/Nodemailer');

router.post('/reg', async function(req, res) {
    try {
        const { name, email } = req.body;

        // Check if a subscriber with the same email exists
        const existingSubscriber = await NewsletterSubscriber.findOne({ email });

        if (existingSubscriber) {
            // Subscriber already exists, return an error message
            return res.redirect('newsletter/success/reg-success');
        }

        // Create a new subscriber
        const subscriber = new NewsletterSubscriber({ name, email });
        await subscriber.save();

        // Redirect to success page
        res.redirect('newsletter/success/reg-success');
    } catch (error) {
        console.error('Error adding newsletter subscriber:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/newsletter/success/reg-success', function(req, res) {
    try {
        res.render('success/newsletter');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error in rendering success page');
    }
});


//Mailling 
router.get('/admin/add', async function(req,res){
    try{
        const subscribers = await NewsletterSubscriber.find();

            res.render('admin/admin_newsletter',{
                 sub:subscribers
            });
    }
    catch{
        console.error(err);
        res.status(500).send('Error in rendering success page');
    }
})

router.post('/req', async function(req,res){
    const { title, content } = req.body;
        console.log(title);
        console.log(content);
    // Fetch all newsletter subscribers from the database
    const subscribers = await NewsletterSubscriber.find();
    
    // Iterate over subscribers and send welcome email
    for (const subscriber of subscribers) {
        await Mailer(subscriber.email, 'Welcome to our Newsletter!', `Thank you for subscribing to our newsletter. We look forward to sharing exciting updates with you.`);
    }

    // Respond with success message
    res.status(200).send('Newsletter sent successfully!');
})

// Export the router
module.exports = router;
