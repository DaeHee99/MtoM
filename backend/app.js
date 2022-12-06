var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postingsRouter = require('./routes/postings');
var commentRouter = require('./routes/comment');
var mypageRouter = require('./routes/mypage');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/postings', postingsRouter);
app.use('/api/comment', commentRouter);
app.use('/api/mypage', mypageRouter);

module.exports = app;
