var express = require('express');
var router = express.Router();
var async = require('async');
var Release = require('../models/release');
var Parts = require('../models/part');

/* GET users listing. */
router.get('/', function(req, res) {
    var catalog;

    catalog = {};

    async.parallel({
        parts: function (callback) {
            return Parts.find({}).sort({year: 'desc'}).exec( function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });
        },
        releases: function (callback) {
            return Release.find({}).sort({year: 'desc', title: 'desc' }).exec( function (err, result) {
                if(err) return(err);
                if (!result){
                    result === 'No departments';
                    return callback(err, result);
                } else {
                    return callback(err, result);
                }
            });
        }
    }, function(err, catalog){
        res.render( 'admin/print_rel', {
            title : 'Список "',
            catalog: catalog
        });
    });
});

router.post('/', function(req, res){
    if(req.body) {

        var newData = Release({
            title: req.body.title,
            year: req.body.year
        });

        newData.save(function (err) {
            if(err)  throw(err);

            res.redirect('/print_rel');
        });

    } else {
        next();
    }
});

module.exports = router;