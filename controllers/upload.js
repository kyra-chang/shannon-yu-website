var fs = require("fs");
const path = require('path');


exports.upload = function(req, res, dir) {
    req.files.forEach(file => {
        var newFile = path.join(__dirname, '/../public/zephyr/images/') + dir + '/' + file.originalname;
        fs.readFile( file.path, function (err, data) {
            fs.writeFile(newFile, data, function (err) {
                if (err) {
                    console.error( err );
                    res.render('up', { message: 'Sorry, file ' + file.originalname + ' couldn\'t be uploaded.'});
                } else {
                    console.log( 'File uploaded successfully' );
                }
            });
        });
    });
    res.render('up', { message: 'File uploaded successfully'});
};
exports.uploadPhoto = function(req, res) {
    var dir = 'photo/' + req.body.hashtag+'/'+req.body.album;
    exports.upload(req, res, dir);
};
exports.uploadDance = function(req, res) {
    var dir = 'dance/' + req.body.dance;
    exports.upload(req, res, dir);
};
exports.uploadIndex = function(req, res) {
    var dir = 'index/' + req.body.index;
    exports.upload(req, res, dir);
};
