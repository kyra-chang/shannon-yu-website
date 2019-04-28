const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/zephyr'));

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/zephyr')));

// routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

var PORT = 8081;
app.listen(PORT, () => console.log('Server started on port '+PORT+''));
module.exports = app;
