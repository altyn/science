var express = require('express');
var router = express.Router();

/* GET main-admin page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Main user page'});
});

module.exports = router;
