var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./config/database')
const bodyParser = require("body-parser");

// ---------------------------------------------------------
// import router file
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// controllers
const head = require('./controllers/header');
// ---------------------------------------------------------
// use express app
var app = express();
db.connection();

// CROSS
app.use(head.head);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// folder access
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',express.static(path.join(__dirname, 'frontEnd/dist/frontEnd')));

// using router
app.use('/', indexRouter);
app.use("/api/user", usersRouter);


// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
