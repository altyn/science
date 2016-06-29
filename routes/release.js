var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Articles = require('../models/articles');

router.get('/:release/:year', function (req, res) {

    var release = req.params.release;
    var yearrel    =  req.params.year;

    var perPage = 10
        , page = req.params.page > 0 ? req.params.page : 0;

    //var data;
    //
    //data = {};
    //
    //async.parallel({
    //    articles: function (callback) {
    //        return Articles.
    //                find({}).
    //                and([{ release: release }, { year: yearrel }]).
    //                sort({publishedDate: 'desc'}).
    //                exec( function (err, result) {
    //                    if(err) return(err);
    //                        return callback(err, result);
    //                });
    //    },
    //    authors: function (callback) {
    //        return Article.findOne({_id: id}).select('author.name').sort({publishedDate: 'desc'}).exec( function (err, result) {
    //            if(err) return(err);
    //            return callback(err, result);
    //            console.log(result);
    //        });
    //    }
    //}, function(err, data){
    //    if(err) return console.error(err);
    //
    //    res.render('rel_articles', {
    //        title: release + ' - ' + yearrel,
    //        data : data
    //    })
    //});

    Articles.
        find({}).
        and([{ release: release }, { year: yearrel }]).
        sort({publishedDate: 'desc'}).
        exec( function (err, data) {
            if(err) return console.error(err);
                res.render('rel_articles', {
                    title: release + ' - ' + yearrel,
                    data : data
                })
            })
});

module.exports = router;