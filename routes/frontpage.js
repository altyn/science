var express = require('express');
var router = express.Router();
var Book = require('../models/book');

/* GET home page. */
router.get('/', function(req, res) {
    Book.
        find({}).
        sort({publishedDate: 'desc'}).
        exec( function (err, books) {
            if(err) return console.error(err);

            res.render('frontpage', {
                title: "Список книг",
                books : books
            })
        });
});

router.get('/j', function(req, res) {
    Book.
        find({}).
        sort({publishedDate: 'desc'}).
        exec( function (err, books) {
            if(err) return console.error(err);

            res.json({
                title: "Список книг",
                books : books
            })
        });
});

module.exports = router;
