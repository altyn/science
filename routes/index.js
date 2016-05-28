var express = require('express');
var router = express.Router();

/* GET main page. */
//router.get('/index', function(req, res, next) {
//  res.render('index');
//});

router.use('/login', require('./login'));
router.use('/logout', require('./logout'));
router.use('/index', require('./main'));
router.use('/book', require('./book'));
router.use('/upload', require('./uploads'));

router.get('/', function (req, res) {
  res.render('frontpage');
});


module.exports = router;
