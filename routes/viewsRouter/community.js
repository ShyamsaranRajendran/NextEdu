// Router file
var express = require('express');
var router = express.Router();
var Community = require('../../models/community.js');

router.get('/:id', async function (req, res) {
    try {
        const community = await Community.find({ course : req.params.id });
        if (community.length === 0) {
           
        }
        res.render('common/community', {
            community: community,
            id: req.params.id,
            currentUser: req.username
        });
    } catch (error) {
        console.error('Error finding communities:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/', async function (req, res) {
    try {
        const community = await Community.find({ course : null });
     
        res.render('common/community-1', {
            community: community,
            currentUser: req.username

        });
    } catch (error) {
        console.error('Error finding communities:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/', async (req, res) => {
    try {
        const { desc, communityId } = req.body;
        const userId = req.session.username;
     
        console.log(desc,communityId,userId)
        const newCommunity = new Community({
            username: userId,
            desc: desc,
            time: Date(),
            course: communityId,
            currentUser: req.username
        });

        await newCommunity.save();

        // Redirect to the newly created community page or some other appropriate location
        res.redirect(`/community/${communityId}`);
    } catch (error) {
        console.error('Error adding Community:', error);
        res.status(500).send('Internal Server Error');
    }
});



router.post('/common', async (req, res) => {
    try {
        const { desc } = req.body;
        const userId = req.session.username;
     
        console.log(desc,userId)
        const newCommunity = new Community({
            username: userId,
            desc: desc,
            time: Date(),
            course: null
        });

        await newCommunity.save();

        // Redirect to the newly created community page or some other appropriate location
        res.redirect('/community');
    } catch (error) {
        console.error('Error adding Community:', error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;
