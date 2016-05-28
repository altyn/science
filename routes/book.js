var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/books');

/* GET login page. */
router.get('/', function (req, res) {
    Book.
        find({}).
        sort('publishedDate').
        exec( function (err, books) {
            if(err) return console.error(err);

            res.render('admin/books', {
                title: "Список книг",
                    books : books
            })
        });
});

router.get('/j', function (req, res) {
    Book.
        find({}).
        sort('publishedDate').
        exec( function (err, books) {
            if(err) return console.error(err);

            res.jsonp('admin/books', {
                title: "Список книг",
                books : books
            })
        });
});

router.get('/add', function (req, res) {
    res.render('admin/addBook');
});

router.post('/add', function(req, res) {

    if(req.body) {

        var newBook = Book({
            book_title: req.body.book_title,
            author: req.body.book_author,
            bookType: req.body.book_type,
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

    //Book.find({ book_title: req.body.book_title }, function(err, book) {

    //    if (err) throw err;
    //
    //    if(book.length)
    //        console.log('eerorororororo');
    //
    //});
        //if(req.body){
        //    var newBook = Book({
        //        book_title : req.body.book_title,
        //        author : req.body.book_author,
        //        bookType : req.body.book_type,
        //        year : req.body.year_pub,
        //        language : req.body.book_lang
        //    });
        //
        //    Book.find({book_title : req.body.book_title}, function (err, docs) {
        //        if (docs.length){
        //            res.flash('info', 'Name exists already');
        //            //cb('Name exists already',null);
        //        }else{
        //            newBook.save(function (err) {
        //                if(err){
        //
        //                    next(err);
        //                } else {
        //                    res.status(200);
        //                }
        //            });
        //        }
        //    });
        //
        //
        //} else {
        //    throw err;
        //}
})

router.post('/thumb', function(req, res, next) {

})

router.post('/link', function(req, res, next) {

})

module.exports = router;
