var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var path = require('path');
var mongoose = require('mongoose');
var Link = require('../models/files');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../public/uploads/files');
    },
    filename: function (req, file, cb) {

        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)
            var fn = raw.toString('hex') + path.extname(file.originalname)
            cb(null, fn);

            var newFiles = Link({
                link : fn
            });
            newFiles.save(function (err) {
                if(err) {
                    console.error(err);
            }});
        })
    }
});

var imgupload = multer({ storage : storage}).single('img');

/* GET main page. */
router.get('/', function(req, res){
    Link.
        find({}).
        sort({uploaded: 'desc'}).
        exec( function (err, files) {
            if(err) return console.error(err);

            res.render('admin/upload', {
                title: "Загрузить файл",
                files : files
            })
        });
});

router.get('/thumb', function(req, res){
    res.render('admin/imgUpload', {title: "Загрузить изображение"});
});

router.post('/thumb', function(req, res) {
    imgupload(req, res, function(err) {
       if(err){
           return res.end("Error uploading file.");
       }
       res.redirect('/upload');
    });
});

module.exports = router;