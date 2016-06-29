var express = require('express');
var passport = require('passport');
var router = express.Router();
var Requirements = require('../models/requirements');
var Compositions = require('../models/composition');
var Articles = require('../models/articles');

/*================= Admin Page Routes ===============*/
router.use('/index'/*,isLoggedIn*/ , require('./main'));
router.use('/upload'/*,isLoggedIn */, require('./uploads'));
router.use('/users'/*,isLoggedIn */, require('./users'));
router.use('/requirements',/*isLoggedIn,*/ require('./requirements'));
router.use('/compositions',/*isLoggedIn,*/ require('./compositions'));
router.use('/print_years',/*isLoggedIn,*/ require('./print_years'));
router.use('/print_rel',/*isLoggedIn,*/ require('./print_rel'));
router.use('/articles',/*isLoggedIn,*/ require('./articles'));
router.use('/sections',/*isLoggedIn,*/ require('./sections'));
router.post('/signup',/* isLoggedIn, */passport.authenticate('local-signup', {
    successRedirect: '/users',
    failureRedirect: '/',
    failureFlash: true
}));

/*================= Front Page Routes ==============*/
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

router.get('/', function(req, res) {
        res.render( 'frontpage', {
            title : 'Научные пуликации БФЭА'
        });
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
router.use('/release', require('./release'));

module.exports = router;

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated())
    return next();
  res.redirect('/');
}