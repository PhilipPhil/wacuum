var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');


var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var commentRouter = require('./routes/commentRouter');
var urlRouter = require('./routes/urlRouter');

const mongoose = require("mongoose");

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then(
  (db) => {
    console.log("Connected correctly to server");
  },
  (err) => {
    console.log(err);
  }
);

var app = express();

// // Secure traffic only
// app.all('*', (req, res, next) => {
//   if (req.secure) {
//     return next();
//   }
//   else {
//     res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
//   }
// });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('12345-67890-09876-54321'));

app.use(passport.initialize());


app.use("/users", usersRouter);
app.use('/comments', commentRouter);
app.use('/url',urlRouter)

app.use("/index", indexRouter);


// app.use(express.static(path.join(__dirname, "public")));
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// app.get('/deal/:dealId', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// app.get('/contact', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// app.get('/about', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// app.get('/favorites', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// app.get('/deals', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// app.get('/deal', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// app.get('/error', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  // next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
