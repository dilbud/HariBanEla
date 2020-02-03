
import { userRouter } from './app/routes/users';
import { chatRouter } from './app/routes/chat';
import { categoryRouter } from './app/routes/category';
import { appointmentRouter } from './app/routes/appointment';
import { questionRouter } from './app/routes/questions';
const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const logger = require('morgan');
// const cors = require('cors');
const dbConnection = require('./app/config/database');
const bodyParser = require('body-parser');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

app.use(passport.initialize()); //
app.use(passport.session()); //

// folder access
app.use(express.urlencoded({extended: false}));
// app.use(cookieParser());
// app.use(cors());
// const distDir = __dirname + '/frontEnd/dist/frontEnd';
// app.use(express.static(distDir));
// // app.use(cors({
// //   origin: 'http://localhost:4200',
// // }));
dbConnection.connection();
app.use('/api/chat', chatRouter);
app.use('/api/category', categoryRouter);
app.use('/api/user', userRouter);
app.use('/api/appointment', appointmentRouter);
app.use('/api/questions', questionRouter);
app.use('/', express.static(path.join(process.cwd(),'//dist/apps/frontEnd')));
app.get('/*', (req, res) => {

  res.sendFile(path.join(process.cwd() + '//dist/apps/frontEnd/index.html'));
});

// app.get('/api', (req, res) => {
//   res.send({ message: 'Welcome to server!' });
// });

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
