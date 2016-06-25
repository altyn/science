var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Articles = require('../models/articles');

router.get('/:release/:year', function (req, res) {
    var release = 'Выпуск №'+req.params.release;
    var year    =  req.params.year;

    var perPage = 10
        , page = req.params.page > 0 ? req.params.page : 0
    Articles.
        find({}).
        limit(perPage).
        skip(perPage * page).
        sort({publishedDate: 'desc'}).
        exec( function (err, data) {
            if(err) return console.error(err);
            Articles.count().exec( function (err, count) {
                if(err) return console.error(err);
                res.render('rel_articles', {
                    title: release + ' - ' + year,
                    data : data,
                    page : page,
                    pages: count/perPage
                })
            })
        });
});

module.exports = router;