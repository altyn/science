var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Compositions = require('../models/composition');

/* GET login page. */
router.get('/', function (req, res) {
    Compositions.
        find({}).
        sort({publishedDate: 'desc'}).
        exec( function (err, data) {
            if(err) return console.error(err);

            res.render('admin/compositions', {
                title: "Состав редакционной коллегии",
                data : data
            })
        });
});

router.post('/', function (req, res) {
    if(req.body) {

        var newData = Compositions({
            title: req.body.title,
            content: req.body.content
        });

        newData.save(function (err) {
            if(err) throw(err);

            res.redirect('/compositions');

        });

    } else {
        next();
    }
});

module.exports = router;
