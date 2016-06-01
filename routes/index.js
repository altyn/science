var express = require('express');
var passport = require('passport');
var router = express.Router();
var Book = require('../models/books');

router.use('/index',isLoggedIn , require('./main'));
router.use('/book',isLoggedIn , require('./book'));
router.use('/upload',isLoggedIn , require('./uploads'));
router.use('/users',isLoggedIn , require('./users'));

router.get('/login', function(req, res) {
  res.render('login', {
    message: req.flash('loginMessage')
  });
});
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
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

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated())
    return next();
  res.redirect('/');
}