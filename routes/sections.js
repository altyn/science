var express = require('express');
var router = express.Router();
var Section = require('../models/section');

/* GET users listing. */
router.get('/', function(req, res) {
    Section.
        find({}).
        sort({title: 'desc'}).
        exec( function (err, section) {
            if(err) return console.error(err);

            res.render('admin/section', {
                title: "Список направлений",
                section : section
            })
        });
});

router.post('/', function(req, res){
    if(req.body) {

        var newData = Section({
            title: req.body.title
        });

        newData.save(function (err) {
            if(err)  throw(err);

            res.redirect('/sections');
        });

    } else {
        next();
    }
});

module.exports = router;