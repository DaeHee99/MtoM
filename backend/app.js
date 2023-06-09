var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./routes/users");
var postingsRouter = require("./routes/postings");
var commentRouter = require("./routes/comment");
var mypageRouter = require("./routes/mypage");

var app = express();

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("secret"));

//app.use('/', indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/postings", postingsRouter);
app.use("/api/comment", commentRouter);
app.use("/api/mypage", mypageRouter);
app.get("/*", function (request, response) {
  response.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

module.exports = app;
