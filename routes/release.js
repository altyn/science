var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Articles = require('../models/articles');

router.get('/:release/:year', function (req, res) {

    var release = req.params.release;
    var yearrel    =  req.params.year;

    var perPage = 10
        , page = req.params.page > 0 ? req.params.page : 0;

    Articles.
        find({}).
        and([{ release: release }, { year: yearrel }]).
        sort({publishedDate: 'desc'}).
        exec( function (err, data) {
            if(err) return console.error(err);
                res.render('rel_articles', {
                    title: release + ' - ' + yearrel,
                    data : data,
                    relese: release,
                    year_rel: yearrel
                })
            })
});

module.exports = router;