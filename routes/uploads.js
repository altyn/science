var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../public/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({ storage : storage}).single('linkforDown');


/* GET main page. */
router.post('/thumb', upload, function(req, res, next) {

});

module.exports = router;