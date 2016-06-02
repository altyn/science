var express = require('express');
var router = express.Router();
var User = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res) {
  User.
      find({}).
      sort({created: 'desc'}).
      exec( function (err, users) {
        if(err) return console.error(err);

        res.render('admin/users', {
          title: "Список пользователей",
          users : users,
          user: req.user
        })
      });
});

module.exports = router;
