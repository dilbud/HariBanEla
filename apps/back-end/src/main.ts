import { userRouter } from './app/routes/users';
import { chatRouter } from './app/routes/chat';
import { categoryRouter } from './app/routes/category';
import { appointmentRouter } from './app/routes/appointment';
import { questionRouter } from './app/routes/questions';
import { reportRouter } from './app/routes/report';
import { edRouter } from './app/routes/ed';
import { verifyProRouter } from './app/routes/verifyPro';
import { tagRouter } from './app/routes/tag';
import { environment } from './environments/environment';
const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const logger = require('morgan');
// const cors = require('cors');
const dbConnection = require('./app/config/database');
const bodyParser = require('body-parser');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize()); //
app.use(passport.session()); //

// folder access
app.use(express.urlencoded({ extended: false }));

dbConnection.connection();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/chat', chatRouter);
app.use('/api/category', categoryRouter);
app.use('/api/user', userRouter);
app.use('/api/appointment', appointmentRouter);
app.use('/api/questions', questionRouter);
app.use('/api/report', reportRouter);
app.use('/api/ed', edRouter);
app.use('/api/verifypro', verifyProRouter);
app.use('/api/tag', tagRouter);
app.use('/', express.static(path.join(process.cwd(), '/dist/apps/frontEnd')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(process.cwd() + '/dist/apps/frontEnd/index.html'));
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
