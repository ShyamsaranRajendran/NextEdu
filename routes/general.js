var express =require('express');
var router = express.Router();

router.get('/',function(req,res){
    try {        
        res.render('common/index');
    } catch (error) {
        console.error('Error finding page:', error);
        res.status(500).send('Internal Server Error');
    }
});


//Exports 
module.exports=router;