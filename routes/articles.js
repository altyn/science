var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = require('../models/articles');

/* GET login page. */
router.get('/', function (req, res) {
    Article.
        find({}).
        sort({publishedDate: 'desc'}).
        exec( function (err, data) {
            if(err) return console.error(err);

            res.render('admin/articles', {
                title: "Список статей",
                data : data
            })
        });
});

router.post('/add', function(req, res) {

    if(req.body) {

        var newBook = Book({
            book_title: req.body.book_title,
            author: req.body.book_author,
            _id: req.body.book_isbn,
            bookType: req.body.book_type,
            image: req.body.book_photo,
            downloadLink: req.body.book_link,
            year: req.body.year_pub,
            language: req.body.book_lang
        });

        newBook.save(function (err) {
            if(err) {
                console.error(err);
            } else {
                res.sendStatus(200);
            }
        });

    } else {
        next();
    }
});

router.get('/edit/:id?/', function (req, res) {
    Article.findById ( req.params.id, function(err, data){
        if(err) return console.error(err);

        res.render('admin/editarticle',{
            locals: {
                title: "Изменить",
                data : data
            }
        });
    });
});

router.get('/show/:id', function (req, res) {
    var id = req.params.id;
    Article.
        findById({_id: id}).
        sort({publishedDate: 'desc'}).
        exec( function (err, data) {
            if(err) return console.error(err);

            res.render('admin/articles', {
                title: "Список статей",
                data : data
            })
        });
});


module.exports = router;
