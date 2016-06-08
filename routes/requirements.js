var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Requirements = require('../models/requirements');

/* GET login page. */
router.get('/', function (req, res) {
    Requirements.
        find({}).
        sort({publishedDate: 'desc'}).
        exec( function (err, data) {
            if(err) return console.error(err);

            res.render('admin/requirements', {
                title: "Требования",
                data : data
            })
        });
});

router.post('/', function (req, res) {
    if(req.body) {

        var newData = Requirements({
            title: req.body.title,
            content: req.body.content
        });

        newData.save(function (err) {
            if(err)  throw(err);

            res.redirect('/requirements');
        });

    } else {
        next();
    }
});

router.get('/show', function (req, res) {
    Requirements.findById ( req.params.id, function(err, data){
        if(err) return console.error(err);

        res.render('admin/editBook',{
            locals: {
                title: "Изменить",
                data: data
            }
        });
    });
});

router.post('/edit/:id?/', function(req, res) {

    Requirements.
        findOne({}).
        sort({publishedDate: 'desc'}).
        exec( function (err, data) {
            if(err) return console.error(err);

            res.render('admin/requirements-show', {
                title: "Требования",
                data : data
            })
        });
});

module.exports = router;
