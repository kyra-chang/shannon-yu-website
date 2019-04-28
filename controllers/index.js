const fs = require('fs');
const imagesFolder = './public/zephyr/images/';

const dance_c_link = ['https://youtu.be/15N4HJKK18o',
'https://youtu.be/q92CIkDNpzA',
'https://youtu.be/lovy6gOBv-g',
'https://youtu.be/4PpXgYwyOCw',
'https://youtu.be/hhbuFE0D8ww',
'https://youtu.be/0F-raQG4YyU',
'https://youtu.be/E8_Fe-Fxv-0',
'https://youtu.be/RUAgBgnWs-g',
'https://youtu.be/TumE7oeMJnE',
'https://youtu.be/B-LgywgssKY',
];
const art_link = ['https://youtu.be/5kF6LFeSv7s',
'https://youtu.be/4PpXgYwyOCw',
'https://youtu.be/ZY7xKsKPOTs',
'https://youtu.be/RznLuYU4Z94'
];
exports.index = function(req, res, next) {
    const indexFolder = imagesFolder + 'index/';
    var images = {photo: [], dance: [], art: []};
    fs.readdirSync(indexFolder + 'photo/').forEach(file => {
        images.photo.push('images/index/photo/'+file);
    });
    fs.readdirSync(indexFolder + 'dance/').forEach(file => {
        images.dance.push('images/index/dance/'+file);
    });
    fs.readdirSync(indexFolder + 'art/').forEach(file => {
        images.art.push('images/index/art/'+file);
    });
    res.render('index', {images: images});
};
exports.createParams = function(result, links, name){
    const files = fs.readdirSync(imagesFolder + 'dance/' + name + '/');
    for (let i = 0; i < files.length; i++) {
        const noType = files[i].toString().split('.')[0];
        result[name].push({
            title: noType.slice(noType.indexOf(' ')+1), 
            href: links[i], 
            src: 'images/dance/'+name+'/'+files[i]
        });
    }
}
exports.dance = function(req, res, next) {
    var dance = {art: [], dance_c: []};   
    exports.createParams(dance, dance_c_link, 'dance_c');
    exports.createParams(dance, art_link, 'art');
    res.render('dance', {dance: dance});
};
var aboutBody = [];
var flowStill = [];
const photoFolder = imagesFolder + 'photo/';
exports.albums = function(req, res, next) { 
    
    if (aboutBody.length == 0) {
        fs.readdirSync(photoFolder + 'aboutBody/').forEach(file => {
            if (file.toString()[0] == '.') {
                return true;
            }
            aboutBody.push({
                name: file,
                tag: 'aboutBody',
                pic: 'images/photo/aboutBody/' + file +'/'+ fs.readdirSync(photoFolder + 'aboutBody/'+file+'/')[0]
            });
        });
    }
    if (flowStill.length == 0) {
        fs.readdirSync(photoFolder + 'flowStill/').forEach(file => {
            flowStill.push({
                name: file,
                tag: 'flowStill',
                pic: 'images/photo/flowStill/' + file +'/'+ fs.readdirSync(photoFolder + 'flowStill/'+file+'/')[0]
            });
        });
    }
    console.log(aboutBody, flowStill);
    res.render('albums', {aboutBody: aboutBody, flowStill: flowStill});
};
exports.album = function(req, res, next) { 
    var pic = [];
    fs.readdirSync(photoFolder + req.params.tag + '/' + req.params.name + '/').forEach(file => {
        pic.push('images/photo/'+req.params.tag + '/' + req.params.name + '/'+file);
    });
    res.render('album', {pic: pic, tag: req.params.tag, name: req.params.name});
};