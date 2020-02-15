const express = require('express');
export const chatRouter = express.Router();
const Appointment = require('../models/appointment');
const winston = require('../config/winston');
const Chatkit = require('@pusher/chatkit-server');
const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:75b6cdeb-b889-403e-a0eb-5a50da4d3c95',
  key: '5a554936-f216-4f98-a053-80f32b51f827:FB4J+2fgc7X9MWIOpWfQDDdEa5KiUsWI5/NC52a7qCE=',
});


chatRouter.post('/users', (req, res) => {
  const {userId} = req.body;
  console.log(req.body)
    chatkit
      .createUser({
        id: userId,
        name: userId,
        // avatarURL:
      })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        if (err.error === 'services/chatkit/user_already_exists') {
          console.log(`User already exists: ${userId}`);
          res.sendStatus(200);
        } else {
          res.status(err.status).json(err);
        }
      });
});
chatRouter.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id,
  });
  // console.log(authData)/;
  res.status(authData.status).send(authData.body);
});
chatRouter.post('/createRoom/:id',async(req, res, next) =>{
  try {
    const id = req.params.id;
    const appointment = await Appointment.findById(id);
    chatkit.createRoom({
      id: appointment.id,
      creatorId: appointment.professionalName,
      name: 'Chat',
    })
      .then(() => {
        console.log('Room created successfully');
        res.send();
      }).catch((err) => {
        console.log(err);
        res.send();
      });
  } catch (error) {
    winston.error(
      `${error.status || 500} - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
    return next(error);
    throw error; // <-- THIS IS ESSENTIAL FOR BREAKING THE CHAIN
  }
});
