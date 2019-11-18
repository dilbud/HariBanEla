// 536808005835-lqmmujjncb20550usi2kgseudq2a8pn1.apps.googleusercontent.com
// ghPu0CoJtAfloUCQ2OeGk31W

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var xcors = require('./middleware/xcors'); // custom middleware with cors
const db = require('./config/database')
const bodyParser = require("body-parser");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var passport = require('passport');
var usersRouter = require('./routes/users');
var app = express();
app.use(xcors);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize()); // 
app.use(passport.session());  //

// folder access
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',express.static(path.join(__dirname, 'frontEnd/dist/frontEnd')));

// using router
// app.use('/', indexRouter);
app.use('/api/user', usersRouter);


// database connection
db.connection();



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
