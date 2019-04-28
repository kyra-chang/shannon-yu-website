const express = require('express');
const router = express.Router();
var multer  = require('multer');

var upload = multer({ dest: '../images/' });
var uploadCont = require("../controllers/upload");
var indexCont = require("../controllers/index");


/* GET home page. */
router.get('/', indexCont.index);
router.get('/about', function(req, res, next) {
  res.render('aboutt');
});
router.get('/albums', indexCont.albums);
router.get('/album/:tag/:name', indexCont.album);
router.get('/dance', indexCont.dance);
router.get('/up', function(req, res, next) {
  res.render('up', {message: undefined});
});
router.get('/contact', function(req, res, next) {
  res.render('contact');
});
router.post('/photo', upload.array('photos', 20), uploadCont.uploadPhoto);
router.post('/dance', upload.array('dancePics', 20), uploadCont.uploadDance);
router.post('/index', upload.array('indexPics', 20), uploadCont.uploadIndex);

module.exports = router;
