var express = require('express');
var router = express.Router();
var Part = require('../models/part')

/* GET users listing. */
router.get('/', function(req, res) {
    Part.
        find({}).
        sort({title: 'desc'}).
        exec( function (err, years) {
            if(err) return console.error(err);

            res.render('admin/print_year', {
                title: "Список ",
                years : years
            })
        });
});

router.post('/', function(req, res){
    if(req.body) {

        var newData = Part({
            title: req.body.title
        });

        newData.save(function (err) {
            if(err)  throw(err);

            res.redirect('/print_years');
        });

    } else {
        next();
    }
});

module.exports = router;