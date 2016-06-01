var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    if(err){
        return res.end("Error showing files.");
    }
    res.redirect('/');
});

router.get('/files', function(req, res){
    if(err){
        return res.end("Error showing files.");
    }
    res.redirect('/');
    //res.render('admin/upload');

});

module.exports = router;