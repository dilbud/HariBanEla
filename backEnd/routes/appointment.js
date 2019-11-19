const Appointment = require('../models/appointment');
const express = require('express');
const router = express.Router();
const winston = require('../config/winston');
const sgMail = require('../config/sendGrid').sgMail;


/* GET ALL BOOKINGS */

router.get('/', async function(req, res, next) {
  try {
    const appointments = await Appointment.find();
    winston.info(`200 -  View a appointments. - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.json(appointments);

  } catch (error) {
    winston.error(`${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return next(error);
    throw error; // <-- THIS IS ESSENTIAL FOR BREAKING THE CHAIN
  }
});


// GET SINGEL BOOKING BY ID
router.get('/:id', async function(req, res, next) {
  try {
    const appointment = await Appointment.findById(req.params.id);
    winston.info(`200 -booking  View a appointment. - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.json(appointment);
  } catch (error) {
    winston.error(`${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return next(error);
    throw error; // <-- THIS IS ESSENTIAL FOR BREAKING THE CHAIN
  }
});

//   CREATE NEW BOOKING
router.post('/new', async function(req, res, next) {
  try {
    console.log(req.body)
    const appointment = await Appointment.create(req.body);
    winston.info(`200 - created a new appointment. - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.json(appointment);
  } catch (error) {
    winston.error(`${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return next(error);
    throw error; // <-- THIS IS ESSENTIAL FOR BREAKING THE CHAIN
  }
});


//   UPDATING STATUS OF THE BOOKING
router.post('/accept/:id', async function(req, res, next) {

  try {
    const appointment = await Appointment.findById(req.params.id);
    if (req.body.status == 'Accepted') {
      appointment.status = 'Accepted';
      appointment.paymentUrl = 'http://localhost:4200/payment/' + req.params.id;
    }
    else {
      appointment.status = 'Rejected';
    }
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, appointment, {new: true});
    winston.info(`200 - appointment updated. - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    const msg = {
      to: appointment.professionalEmail,
      from: 'Appointmet@haribnela.lk',
      subject: 'Payment Details',
      text: `Your Appointment with ${appointment.professionalName} has been accepted.
              Subject:${appointment.subject}
              Description: ${appointment.description}
              Starting Time: ${appointment.startTime}.
              Ending Time: ${appointment.endTime}
              Payment Amount : ${appointment.paymentAmount}
              URl for payment : ${appointment.paymentUrl}`,
      html: `<html>
      <body>
      <div>
      <div>
      Your Appointment with ${appointment.professionalName} has been accepted.
      <div> Subject:${appointment.subject} </div>
      <div>    Description: ${appointment.description} </div>
      <div>   Starting Time: ${appointment.startTime}. </div>
      <div>    Ending Time: ${appointment.endTime} </div>
              <div>    Payment Amount : ${appointment.paymentAmount} </div>
      </div>
     <div> <a href="${appointment.paymentUrl}>Click here to make your payment </a> </div>
     </div>
      </body>
      </html>`
    };
    sgMail.send(msg, function(err, info) {
      if (err) {
        winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return;
      }
      winston.info(`200 - Email has been Sent. -  ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.json(updatedAppointment);
      // res.json({ success: true, msg: 'Email has been Sent.' });
    });
  } catch (error) {
    winston.error(`${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return next(error);
    throw error; // <-- THIS IS ESSENTIAL FOR BREAKING THE CHAIN
  }
});

router.post('/payment/:id', async function(req, res, next) {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (req.body.paymentStatus == 'Paid') {
      appointment.paymentStatus = 'Paid';
    }
    else {
      appointment.paymentStatus = 'Not paid';
    }
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, appointment, {new: true});
    winston.info(`200 - appointment updated. - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.json(updatedAppointment);
    const msg = {
      to: user.email,
      from: 'Appointmet@haribnela.lk',
      subject: 'Payment Details',
      text: `Your Appointment with ${appointment.proffesionalName} has been made.
              Subject:${appointment.subject}
              Description: ${appointment.description}
              Starting Time: ${appointment.startTime}.
              Ending Time: ${appointment.endTime}
              URl for Communication : ${appointment.chatUrl}`,
      html: '<div><a href="https://allurneeds.herokuapp.com/api/users/resetPassword/${resetToken}>Click here to reset your password </a> </div>',
    };

    sgMail.send(msg, function(err, info) {
      if (err) {
        winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return;
      }
      winston.info(`200 - Email has been Sent. -  ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.json({success: true, msg: 'Email has been Sent.'});
    });
  } catch (error) {
    winston.error(`${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return next(error);
    throw error; // <-- THIS IS ESSENTIAL FOR BREAKING THE CHAIN
  }
});



//   DELETE BOOKING BY ID
router.delete('/:id', async function(req, res, next) {
  try {
    const appointment = await Appointment.findByIdAndRemove(req.params.id, req.body);
    winston.info(`200 - Deleted the appointment sucessful - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.json(appointment);
  } catch (error) {
    winston.error(`${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return next(error);
    throw error; // <-- THIS IS ESSENTIAL FOR BREAKING THE CHAIN
  }
});


module.exports = router;
