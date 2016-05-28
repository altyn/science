var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res) {
    res.render('login', { message: req.flash('loginMessage')});
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/index',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
        return next();
    res.redirect('/');
}