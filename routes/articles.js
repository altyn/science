var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = require('../models/articles');
var Parts = require('../models/part');
var Sections = require('../models/section');
var Releases = require('../models/release');
var async = require('async');

/* GET login page. */
router.get('/', function (req, res) {
    Article.
        find({}).
        sort({publishedDate: 'desc'}).
        limit(5).
        exec( function (err, data) {
            if(err) return console.error(err);

            res.render('admin/articles', {
                title: "Список статей",
                data : data
            })
        });
});

router.post('/', function(req, res) {

    var authors = req.body.author.split(",").map(function(author){
       return {"name": author};
    });
    var rel_long = req.body.release;
    var rel_arr = rel_long.split("-");

    if(req.body) {

        var newArticle = Article({
            title: req.body.title,
            section: req.body.section,
            author: authors,
            annotationKG: req.body.contentky,
            annotationRU: req.body.contentru,
            annotationEN: req.body.contenten,
            year: req.body.year,
            downloadLink: req.body.link,
            release: rel_arr[0],
            content: req.body.content,
            language: req.body.lang

        });
        newArticle.save(function (err) {
            if(err) {
                console.error(err);
            } else {
                res.redirect('/articles');

            }
        });

    } else {
        next();
    }
});

router.get('/add', function(req, res) {
    var data;

    data = {};

    async.parallel({
        sections: function (callback) {
            return Sections.find({}).sort({year: 'desc'}).exec( function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });
        },
        years: function (callback) {
            return Parts.find({}).sort({year: 'desc'}).exec( function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });
        },
        releases: function (callback) {
            return Releases.find({}).sort({year: 'desc', title: 'desc' }).exec( function (err, result) {
                if(err) return(err);
                    return callback(err, result);

            });
        }
    }, function(err, data){
        res.render( 'admin/articles_add', {
            title : 'Добавить статью',
            data: data
        });
    });

});

router.get('/edit/:id', function (req, res) {
    var id = req.params.id;

    var data;

    data = {};

    async.parallel({
        sections: function (callback) {
            return Sections.find({}).sort({year: 'desc'}).exec( function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });
        },
        years: function (callback) {
            return Parts.find({}).sort({year: 'desc'}).exec( function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });
        },
        releases: function (callback) {
            return Releases.find({}).sort({year: 'desc', title: 'desc' }).exec( function (err, result) {
                if(err) return(err);
                return callback(err, result);

            });
        },
        articles: function (callback) {
            return Article.findOne({_id: id}).sort({publishedDate: 'desc'}).exec( function (err, result) {
                if(err) return(err);
                return callback(err, result);

            });
        },
        authors: function (callback) {
            return Article.findOne({_id: id}).select('author.name').sort({publishedDate: 'desc'}).exec( function (err, result) {
                if(err) return(err);
                return callback(err, result);
                console.log(result);
            });
        }
    }, function(err, data){
        if(err) return console.error(err);

        res.render('admin/articles_edit', {
            title: "Изменить статью",
            data : data
        });
    });
});

router.post('/edit/:id', function (req, res) {

    var id = req.params.id;
    var rel_long = req.body.release;
    var rel_arr = rel_long.split("-");

    if(req.body) {

        var articleData = {
            title: req.body.title,
            section: req.body.section,
            annotationKG: req.body.contentky,
            annotationRU: req.body.contentru,
            annotationEN: req.body.contenten,
            year: req.body.year,
            downloadLink: req.body.link,
            release: rel_arr[0],
            content: req.body.content,
            language: req.body.lang

        };

        Article.findByIdAndUpdate(id, articleData, {new: false}, function (err) {
            if(err) {
                console.error(err);
            } else {
                res.redirect('/articles');

            }
        });

    } else {
        next();
    }
});

module.exports = router;
