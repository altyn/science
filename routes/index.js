var express = require('express');
var passport = require('passport');
var router = express.Router();
var Book = require('../models/books');
var Requirements = require('../models/requirements');
var Compositions = require('../models/composition');


router.use('/index',isLoggedIn , require('./main'));
router.use('/book',isLoggedIn , require('./book'));
router.use('/upload',isLoggedIn , require('./uploads'));
router.use('/users',isLoggedIn , require('./users'));
router.use('/requirements', require('./requirements'));
router.use('/compositions', require('./compositions'));


router.get('/login', function(req, res) {
  res.render('login', {
    message: req.flash('loginMessage')
  });
});
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/trebovaniya', function (req, res) {
    Requirements.
        find({}).
        limit(1).
        sort({publishedDate: 'desc'}).
        exec( function (err, data) {
            if(err) return console.error(err);

            res.render('requirements-front', {
                title: "Правила оформления",
                data : data

            })
        });
});
router.get('/sostav', function (req, res) {
    Compositions.
        find({}).
        limit(1).
        sort({publishedDate: 'desc'}).
        exec( function (err, data) {
            if(err) return console.error(err);

            res.render('composition-front', {
                title: "Состав редакционной коллегии",
                data : data

            })
        });
});


router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/index',
  failureRedirect: '/login',
  failureFlash: true
}));
router.post('/signup', isLoggedIn, passport.authenticate('local-signup', {
  successRedirect: '/users',
  failureRedirect: '/',
  failureFlash: true
}));

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

module.exports = router;

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated())
    return next();
  res.redirect('/');
}