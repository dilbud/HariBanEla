// 536808005835-lqmmujjncb20550usi2kgseudq2a8pn1.apps.googleusercontent.com
// ghPu0CoJtAfloUCQ2OeGk31W
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const categoryRouter = require('./routes/category');
const dbConnection = require('./config/database');
const usersRouter = require('./routes/users');
const questionsRouter = require('./routes/questions');
const bodyParser = require('body-parser');
const passport = require('passport');
// var usersRouter = require('./routes/users');
const chatRouter=require('./routes/chat');
const app = express();
const cookieParser = require('cookie-parser');
const appointmentRouter = require('./routes/appointment');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

app.use(passport.initialize()); //
app.use(passport.session()); //

// folder access
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());
const distDir = __dirname + '/frontEnd/dist/frontEnd';
app.use(express.static(distDir));
app.use(cors({
  origin: 'http://localhost:4200',
}));
dbConnection.connection();
app.use('/api/chat', chatRouter);
app.use('/api/category', categoryRouter);
app.use('/api/user', usersRouter);
app.use('/api/appointment', appointmentRouter);
app.use('/api/questions', questionsRouter);
// app.use('/', express.static(path.join(__dirname, 'frontEnd/dist/frontEnd')));
app.get('/*', function(req, res) {

  res.sendFile(path.join(__dirname + '/frontEnd/dist/frontEnd/index.html'));
});





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

app.listen(3000, () => {
  console.log('Server running on port: ' + 3000);
});

module.exports = app;
