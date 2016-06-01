var express = require('express');
var passport = require('passport');
var router = express.Router();

router.use('/index', require('./main'));
router.use('/book', require('./book'));
router.use('/upload', require('./uploads'));
router.use('/users', require('./users'));
router.get('/login', function(req, res) {
  res.render('login', {
    message: req.flash('loginMessage')
  });
});
router.post('/login', passport.authenticate('local', {
  successRedirect: '/index',
  failureRedirect: '/login',
  failureFlash: true
}));
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


router.get('/', function (req, res) {
  res.render('frontpage');
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated())
    return next();
  res.redirect('/');
}