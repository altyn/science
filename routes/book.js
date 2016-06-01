var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/books');

/* GET login page. */
router.get('/', function (req, res) {
    Book.
        find({}).
        sort({publishedDate: 'desc'}).
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
        sort({publishedDate: 'desc'}).
        exec( function (err, books) {
            if(err) return console.error(err);

            res.status(200).json('admin/books', {
                title: "Список книг",
                books : books
            })
        });

});

router.get('/add', function (req, res) {
    res.render('admin/addBook');
});

router.get('/edit/:id?/', function (req, res) {
    Book.findById ( req.params.id, function(err, book){
        if(err) return console.error(err);

        res.render('admin/editBook',{
         locals: {
             title: "Изменить",
             book: book
         }
        });
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

module.exports = router;
