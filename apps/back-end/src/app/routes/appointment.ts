import sgMail from '../config/sendGrid';
const Appointment = require('../models/appointment');
const express = require('express');
const winston = require('../config/winston');
const Chatkit = require('@pusher/chatkit-server');
const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:75b6cdeb-b889-403e-a0eb-5a50da4d3c95',
  key:
    '5a554936-f216-4f98-a053-80f32b51f827:FB4J+2fgc7X9MWIOpWfQDDdEa5KiUsWI5/NC52a7qCE='
});

export const appointmentRouter = express.Router();

/* GET ALL BOOKINGS */

appointmentRouter.get('/', async function(req, res, next) {
  try {
    const appointments = await Appointment.find();
    winston.info(
      `200 -  View a appointments. - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    res.json(appointments);
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

// GET SINGEL BOOKING BY ID
appointmentRouter.get('/:id', async function(req, res, next) {
  try {
    const appointment = await Appointment.findById(req.params.id);
    winston.info(
      `200 -booking  View a appointment. - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    res.json(appointment);
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
// GET BOOKINGS BY USER ID
appointmentRouter.get('/user/:id', async function(req, res, next) {
  try {
    const appointments = await Appointment.find({ userId: req.params.id });
    winston.info(
      `200 -Viewed appointments of a user. - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    res.json(appointments);
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
// GET BOOKINGS BY PROFESSIONAL ID
appointmentRouter.get('/professional/:id', async function(req, res, next) {
  try {
    const appointments = await Appointment.find({
      professionalId: req.params.id
    });
    winston.info(
      `200 -Viewed appointments of a professional. - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    res.json(appointments);
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
//   CREATE NEW BOOKING
appointmentRouter.post('/new', async function(req, res, next) {
  try {
    console.log(req.body);
    const appointment = await Appointment.create(req.body);
    winston.info(
      `200 - created a new appointment. - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    const msg = {
      to: appointment.professionalEmail,
      from: 'Appointmet@haribnela.lk',
      subject: 'New Appointment',
      text: `Your Services are required !
              Hi ${appointment.professionalName},
              {{userName}} has requested an appointment on ${appointment.startTime}. to ${appointment.endTime}
               regarding the following issue.
              ${appointment.subject}
              ${appointment.description}
              ${appointment.userName}} agrees to provide LKR ${appointment.paymentAmount} as remuneration. Do you accept?
              http://localhost:4200/appointment/${appointment.id} Accept		| Reject`,
      html: `
      <!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
       xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
          <meta charset="utf-8"> <!-- utf-8 works for most cases -->
          <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
          <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
          <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
          <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->


          <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i" rel="stylesheet">

          <!-- CSS Reset : BEGIN -->
      <style>

      html,
      body {
          margin: 0 auto !important;
          padding: 0 !important;
          height: 100% !important;
          width: 100% !important;
          background: #f1f1f1;
      }

      /* What it does: Stops email clients resizing small text. */
      * {
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
      }

      /* What it does: Centers email on Android 4.4 */
      div[style*="margin: 16px 0"] {
          margin: 0 !important;
      }

      /* What it does: Stops Outlook from adding extra spacing to tables. */
      table,
      td {
          mso-table-lspace: 0pt !important;
          mso-table-rspace: 0pt !important;
      }

      /* What it does: Fixes webkit padding issue. */
      table {
          border-spacing: 0 !important;
          border-collapse: collapse !important;
          table-layout: fixed !important;
          margin: 0 auto !important;
      }

      /* What it does: Uses a better rendering method when resizing images in IE. */
      img {
          -ms-interpolation-mode:bicubic;
      }

      /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
      a {
          text-decoration: none;
      }

      /* What it does: A work-around for email clients meddling in triggered links. */
      *[x-apple-data-detectors],  /* iOS */
      .unstyle-auto-detected-links *,
      .aBn {
          border-bottom: 0 !important;
          cursor: default !important;
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
      }

      /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
      .a6S {
          display: none !important;
          opacity: 0.01 !important;
      }

      /* What it does: Prevents Gmail from changing the text color in conversation threads. */
      .im {
          color: inherit !important;
      }

      /* If the above doesn't work, add a .g-img class to any image in question. */
      img.g-img + div {
          display: none !important;
      }

      /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
      /* Create one of these media queries for each additional viewport size you'd like to fix */

      /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
          u ~ div .email-container {
              min-width: 320px !important;
          }
      }
      /* iPhone 6, 6S, 7, 8, and X */
      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
          u ~ div .email-container {
              min-width: 375px !important;
          }
      }
      /* iPhone 6+, 7+, and 8+ */
      @media only screen and (min-device-width: 414px) {
          u ~ div .email-container {
              min-width: 414px !important;
          }
      }

      </style>

          <!-- CSS Reset : END -->

          <!-- Progressive Enhancements : BEGIN -->
      <style>

      .primary{
        background: #f3a333;
      }

      .bg_white{
        background: #ffffff;
      }
      .bg_light{
        background: #fafafa;
      }
      .bg_black{
        background: #000000;
      }
      .bg_dark{
        background: rgba(0,0,0,.8);
      }
      .email-section{
        padding:2.5em;
      }

      /*BUTTON*/
      .btn{
        padding: 10px 15px;
      }
      .btn.btn-primary{
        border-radius: 30px;
        background: #f3a333;
        color: #ffffff;
      }



      h1,h2,h3,h4,h5,h6{
        font-family: 'Playfair Display', serif;
        color: #000000;
        margin-top: 0;
      }

      body{
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.8;
        color: rgba(0,0,0,.4);
      }

      a{
        color: #f3a333;
      }

      table{
      }
      /*LOGO*/

      .logo h1{
        margin: 0;
      }
      .logo h1 a{
        color: #000;
        font-size: 20px;
        font-weight: 700;
        text-transform: uppercase;
        font-family: 'Montserrat', sans-serif;
      }

      /*HERO*/
      .hero{
        position: relative;
      }
      .hero img{

      }
      .hero .text{
        color: rgba(255,255,255,.8);
      }
      .hero .text h2{
        color: #ffffff;
        font-size: 30px;
        margin-bottom: 0;
      }


      /*HEADING SECTION*/
      .heading-section{
      }
      .heading-section h2{
        color: #000000;
        font-size: 28px;
        margin-top: 0;
        line-height: 1.4;
      }
      .heading-section .subheading{
        margin-bottom: 20px !important;
        display: inline-block;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: rgba(0,0,0,.4);
        position: relative;
      }
      .heading-section .subheading::after{
        position: absolute;
        left: 0;
        right: 0;
        bottom: -10px;
        content: '';
        width: 100%;
        height: 2px;
        background: #f3a333;
        margin: 0 auto;
      }

      .heading-section-white{
        color: rgba(255,255,255,.8);
      }
      .heading-section-white h2{
        font-size: 28px;
        font-family:
        line-height: 1;
        padding-bottom: 0;
      }
      .heading-section-white h2{
        color: #ffffff;
      }
      .heading-section-white .subheading{
        margin-bottom: 0;
        display: inline-block;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: rgba(255,255,255,.4);
      }


      .icon{
        text-align: center;
      }
      .icon img{
      }


      /*SERVICES*/
      .text-services{
        padding: 10px 10px 0;
        text-align: center;
      }
      .text-services h3{
        font-size: 20px;
      }

      /*BLOG*/
      .text-services .meta{
        text-transform: uppercase;
        font-size: 14px;
      }

      /*TESTIMONY*/
      .text-testimony .name{
        margin: 0;
      }
      .text-testimony .position{
        color: rgba(0,0,0,.3);

      }


      /*VIDEO*/
      .img{
        width: 100%;
        height: auto;
        position: relative;
      }
      .img .icon{
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        bottom: 0;
        margin-top: -25px;
      }
      .img .icon a{
        display: block;
        width: 60px;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -25px;
      }



      /*COUNTER*/
      .counter-text{
        text-align: center;
      }
      .counter-text .num{
        display: block;
        color: #ffffff;
        font-size: 34px;
        font-weight: 700;
      }
      .counter-text .name{
        display: block;
        color: rgba(255,255,255,.9);
        font-size: 13px;
      }


      /*FOOTER*/

      .footer{
        color: rgba(255,255,255,.5);

      }
      .footer .heading{
        color: #ffffff;
        font-size: 20px;
      }
      .footer ul{
        margin: 0;
        padding: 0;
      }
      .footer ul li{
        list-style: none;
        margin-bottom: 10px;
      }
      .footer ul li a{
        color: rgba(255,255,255,1);
      }


      @media screen and (max-width: 500px) {

        .icon{
          text-align: left;
        }

        .text-services{
          padding-left: 0;
          padding-right: 20px;
          text-align: left;
        }

      }

      </style>


      </head>

      <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;">
        <center style="width: 100%; background-color: #f1f1f1;">
          <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;
           font-family: sans-serif;">
            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
            &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
            &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
          </div>
          <div style="max-width: 600px; margin: 0 auto;" class="email-container">
            <!-- BEGIN BODY -->
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
              <tr>
                <td class="bg_white logo" style="padding: 1em 2.5em; text-align: center">
                  <h1><a href="#" style="color: #000000;">HariBanEla</a></h1>
                </td>
              </tr><!-- end tr -->
              <tr>
                <td valign="middle" class="hero" style="background-image: url(images/bg_1.jpg); background-size: cover; height: 400px;">
                  <table>
                    <tr>
                      <td>
                        <div class="text" style="padding: 0 3em; text-align: center;">
                          <h2>Your Services are required &excl;</h2>
                        </div>
                      </td>
                      </tr>
                      <tr>
                          <td class="text-services" style="text-align: left;">
                              <p>Hi ${appointment.professionalName} &comma; </p>
                              <p> ${appointment.userName} has requested an appointment on ${appointment.startTime}
                               to ${appointment.endTime} regarding the following issue.</p>
                              <p>${appointment.subject}</p>
                              <p> ${appointment.description}</p>
                              <p>${appointment.userName} agrees to provide LKR  ${appointment.paymentAmount}
                              as remuneration. Do you accept?</p>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td valign="top" width="50%" style="padding-top: 20px;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                  <td class="text-services" style="text-align: left;">
                                      <a href="http://localhost:4200/appointment/${appointment.id} " class="btn btn-primary"
                                      style="text-align: center; padding:24px; border-radius: 30px; background: #46ad00; color: #ffffff;">
                                      <h3>Accept</h3></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td valign="top" width="50%" style="padding-top: 20px;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                  <td class="text-services" style="text-align: left;">
                                    <a href="http://localhost:4200/appointment/${appointment.id}class="btn btn-primary"
                                    style="text-align: center; padding:24px; border-radius: 30px; background: #c20303; color: #ffffff;">
                                    <h3>Decline</h3></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                          </td>
                      </tr>
                  </table>
                </td>
              </tr><!-- end tr -->
            <!-- 1 Column Text + Button : END -->
            </table>
            <!--Footer-->
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
              <tr>
              <td valign="middle" class="bg_black footer email-section">
                <table>
                    <tr>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-right: 10px;">
                            <img src="https://res.cloudinary.com/cascadia/image/upload/v1581557749/samples/logo_a3dr7a.png" alt="" style="width: 100%; max-width: 600px; height: auto; margin: auto; display: block;">
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                            <td style="text-align: left; padding-right: 10px;">
                                <h3 class="heading">HariBanEla</h3>
                                <p>A small team's dream of creating a Sri Lankan Stackoverflow</p>
                            </td>
                            </tr>
                        </table>
                        </td>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                              <h3 class="heading">Contact Info</h3>
                              <ul>
                                        <li><span class="text">203 Fake St. Fake Town, Colombo, Sri Lanka</span></li>
                                        <li><span class="text">+94 392 3929</span></a></li>
                                      </ul>
                          </td>

                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr><!-- end: tr -->
            <tr>
                <td valign="middle" class="bg_black footer email-section">
                    <table>
                    <tr>
                    <td valign="top" width="33.333%">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-right: 10px;">
                              <p>&copy; 2020 HariBanEla.lk All Rights Reserved</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="33.333%">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: right; padding-left: 5px; padding-right: 5px;">
                              <p><a href="#" style="color: rgba(255,255,255,.4);">Unsubcribe</a></p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                </td>
            </tr>
          </table>

          </div>
        </center>
      </body>
      </html>`
    };

    sgMail.send(msg, function(err, info) {
      if (err) {
        winston.error(
          `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
            req.method
          } - ${req.ip}`
        );
        return;
      }
      winston.info(
        `200 - Email has been Sent. -  ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
      res.json(appointment);
      // res.json({ success: true, msg: 'Email has been Sent.' });
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

//   UPDATING STATUS OF THE BOOKING
appointmentRouter.post('/accept/:id', async function(req, res, next) {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (req.body.status == 'Accepted') {
      appointment.status = 'Accepted';
      appointment.paymentUrl =
        'https://haribnela.herokuapp.com/payment/' + req.params.id;
    } else {
      appointment.status = 'Rejected';
    }
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      appointment,
      { new: true }
    );
    winston.info(
      `200 - appointment updated. - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    let msg;
    if (appointment.status === 'Accepted') {
       msg = {
        to: appointment.professionalEmail,
        from: 'Appointmet@haribnela.lk',
        subject: 'Payment Details',
        text: ` Great News – Your request to ${appointment.professionalName} has been accepted.
        Hi ${appointment.userName},
        ${appointment.professionalName} is available to connect on${appointment.startTime} to ${appointment.endTime}
        to assist you regarding ${appointment.description}
        Please complete payment to confirm.
        Pay Now ${appointment.paymentUrl}`,

        html: `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <meta charset="utf-8"> <!-- utf-8 works for most cases -->
        <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
        <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
        <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->


        <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i" rel="stylesheet">

        <!-- CSS Reset : BEGIN -->
    <style>

    html,
    body {
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        background: #f1f1f1;
    }

    /* What it does: Stops email clients resizing small text. */
    * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
    }

    /* What it does: Centers email on Android 4.4 */
    div[style*="margin: 16px 0"] {
        margin: 0 !important;
    }

    /* What it does: Stops Outlook from adding extra spacing to tables. */
    table,
    td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
    }

    /* What it does: Fixes webkit padding issue. */
    table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
    }

    /* What it does: Uses a better rendering method when resizing images in IE. */
    img {
        -ms-interpolation-mode:bicubic;
    }

    /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
    a {
        text-decoration: none;
    }

    /* What it does: A work-around for email clients meddling in triggered links. */
    *[x-apple-data-detectors],  /* iOS */
    .unstyle-auto-detected-links *,
    .aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }

    /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
    .a6S {
        display: none !important;
        opacity: 0.01 !important;
    }

    /* What it does: Prevents Gmail from changing the text color in conversation threads. */
    .im {
        color: inherit !important;
    }

    /* If the above doesn't work, add a .g-img class to any image in question. */
    img.g-img + div {
        display: none !important;
    }

    /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
    /* Create one of these media queries for each additional viewport size you'd like to fix */

    /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
            min-width: 320px !important;
        }
    }
    /* iPhone 6, 6S, 7, 8, and X */
    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
            min-width: 375px !important;
        }
    }
    /* iPhone 6+, 7+, and 8+ */
    @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
            min-width: 414px !important;
        }
    }

    </style>

        <!-- CSS Reset : END -->

        <!-- Progressive Enhancements : BEGIN -->
    <style>

    .primary{
      background: #f3a333;
    }

    .bg_white{
      background: #ffffff;
    }
    .bg_light{
      background: #fafafa;
    }
    .bg_black{
      background: #000000;
    }
    .bg_dark{
      background: rgba(0,0,0,.8);
    }
    .email-section{
      padding:2.5em;
    }

    /*BUTTON*/
    .btn{
      padding: 10px 15px;
    }
    .btn.btn-primary{
      border-radius: 30px;
      background: #f3a333;
      color: #ffffff;
    }



    h1,h2,h3,h4,h5,h6{
      font-family: 'Playfair Display', serif;
      color: #000000;
      margin-top: 0;
    }

    body{
      font-family: 'Montserrat', sans-serif;
      font-weight: 400;
      font-size: 15px;
      line-height: 1.8;
      color: rgba(0,0,0,.4);
    }

    a{
      color: #f3a333;
    }

    table{
    }
    /*LOGO*/

    .logo h1{
      margin: 0;
    }
    .logo h1 a{
      color: #000;
      font-size: 20px;
      font-weight: 700;
      text-transform: uppercase;
      font-family: 'Montserrat', sans-serif;
    }

    /*HERO*/
    .hero{
      position: relative;
    }
    .hero img{

    }
    .hero .text{
      color: rgba(255,255,255,.8);
    }
    .hero .text h2{
      color: #ffffff;
      font-size: 30px;
      margin-bottom: 0;
    }


    /*HEADING SECTION*/
    .heading-section{
    }
    .heading-section h2{
      color: #000000;
      font-size: 28px;
      margin-top: 0;
      line-height: 1.4;
    }
    .heading-section .subheading{
      margin-bottom: 20px !important;
      display: inline-block;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: rgba(0,0,0,.4);
      position: relative;
    }
    .heading-section .subheading::after{
      position: absolute;
      left: 0;
      right: 0;
      bottom: -10px;
      content: '';
      width: 100%;
      height: 2px;
      background: #f3a333;
      margin: 0 auto;
    }

    .heading-section-white{
      color: rgba(255,255,255,.8);
    }
    .heading-section-white h2{
      font-size: 28px;
      font-family:
      line-height: 1;
      padding-bottom: 0;
    }
    .heading-section-white h2{
      color: #ffffff;
    }
    .heading-section-white .subheading{
      margin-bottom: 0;
      display: inline-block;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: rgba(255,255,255,.4);
    }


    .icon{
      text-align: center;
    }
    .icon img{
    }


    /*SERVICES*/
    .text-services{
      padding: 10px 10px 0;
      text-align: center;
    }
    .text-services h3{
      font-size: 20px;
    }

    /*BLOG*/
    .text-services .meta{
      text-transform: uppercase;
      font-size: 14px;
    }

    /*TESTIMONY*/
    .text-testimony .name{
      margin: 0;
    }
    .text-testimony .position{
      color: rgba(0,0,0,.3);

    }


    /*VIDEO*/
    .img{
      width: 100%;
      height: auto;
      position: relative;
    }
    .img .icon{
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      bottom: 0;
      margin-top: -25px;
    }
    .img .icon a{
      display: block;
      width: 60px;
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -25px;
    }



    /*COUNTER*/
    .counter-text{
      text-align: center;
    }
    .counter-text .num{
      display: block;
      color: #ffffff;
      font-size: 34px;
      font-weight: 700;
    }
    .counter-text .name{
      display: block;
      color: rgba(255,255,255,.9);
      font-size: 13px;
    }


    /*FOOTER*/

    .footer{
      color: rgba(255,255,255,.5);

    }
    .footer .heading{
      color: #ffffff;
      font-size: 20px;
    }
    .footer ul{
      margin: 0;
      padding: 0;
    }
    .footer ul li{
      list-style: none;
      margin-bottom: 10px;
    }
    .footer ul li a{
      color: rgba(255,255,255,1);
    }


    @media screen and (max-width: 500px) {

      .icon{
        text-align: left;
      }

      .text-services{
        padding-left: 0;
        padding-right: 20px;
        text-align: left;
      }

    }

    </style>


    </head>

    <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;">
      <center style="width: 100%; background-color: #f1f1f1;">
        <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;
        font-family: sans-serif;">
          &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
          &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        </div>
        <div style="max-width: 600px; margin: 0 auto;" class="email-container">
          <!-- BEGIN BODY -->
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
            <tr>
              <td class="bg_white logo" style="padding: 1em 2.5em; text-align: center">
                <h1><a href="#" style="color: #000000;">HariBanEla</a></h1>
              </td>
            </tr><!-- end tr -->
            <tr>
              <td valign="middle" class="hero" style=" background-size: cover; height: 400px;">
                <table>
                  <tr>
                    <td>
                      <div class="text" style="padding: 0 3em; text-align: center;">
                        <h2>Great News! Your request to  ${appointment.professionalName}} has been accepted</h2>
                      </div>
                    </td>
                    </tr>
                    <tr>
                        <td class="text-services" style="text-align: left;">
                            <p>Hi ${appointment.userName},</p>
                            <p> ${appointment.professionalName} is available to connect on
                             <span style="font-weight: 700;">${appointment.startTime}</span> to
                              <span style="font-weight: 700;">${appointment.endTime}</span>
                               to assist you regarding ${appointment.description}</p>
                            <p>Please complete payment to confirm.</p>
                            <a href=${appointment.paymentUrl} class="btn btn-primary"
                             style="text-align: center; padding:24px; border-radius: 30px;
                             background: #000000; color: #ffffff;">Pay Now</a>
                        </td>
                    </tr>
                </table>
              </td>
            </tr><!-- end tr -->
          <!-- 1 Column Text + Button : END -->
          </table>
          <!--Footer-->
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
            <tr>
              <td valign="middle" class="bg_black footer email-section">
                <table>
                  <tr>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-right: 10px;">
                            <img src="https://res.cloudinary.com/cascadia/image/upload/v1581557749/samples/logo_a3dr7a.png"
                            alt="" style="width: 100%; max-width: 600px; height: auto; margin: auto; display: block;">
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                            <td style="text-align: left; padding-right: 10px;">
                                <h3 class="heading">HariBanEla</h3>
                                <p>A small team's dream of creating a Sri Lankan Stackoverflow</p>
                            </td>
                            </tr>
                        </table>
                        </td>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                            <h3 class="heading">Contact Info</h3>
                            <ul>
                              <li><span class="text">203 Fake St. Fake Town, Colombo, Sri Lanka</span></li>
                              <li><span class="text">+94 392 3929</span></a></li>
                            </ul>
                          </td>

                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr><!-- end: tr -->
            <tr>
              <td valign="middle" class="bg_black footer email-section">
                <table>
                  <tr>
                    <td valign="top" width="33.333%">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-right: 10px;">
                            <p>&copy; 2020 HariBanEla.lk All Rights Reserved</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="33.333%">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: right; padding-left: 5px; padding-right: 5px;">
                            <p><a href="#" style="color: rgba(255,255,255,.4);">Unsubcribe</a></p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

        </div>
      </center>
    </body>
    </html>
  `
      };
    }
    if (appointment.status === 'Rejected') {
       msg = {
        to: appointment.professionalEmail,
        from: 'Appointmet@haribnela.lk',
        subject: 'Payment Details',
        text: ` Ooh Shoot – Request Declined
        ${appointment.professionalName} is not available on ${appointment.startTime} to ${appointment.endTime}.
        Try another date or find another expert on HariBanEla`,

        html: `

        <!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
         xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
            <meta charset="utf-8"> <!-- utf-8 works for most cases -->
            <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
            <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
            <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->


            <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i" rel="stylesheet">

            <!-- CSS Reset : BEGIN -->
        <style>

        html,
        body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
            background: #f1f1f1;
        }

        /* What it does: Stops email clients resizing small text. */
        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        /* What it does: Centers email on Android 4.4 */
        div[style*="margin: 16px 0"] {
            margin: 0 !important;
        }

        /* What it does: Stops Outlook from adding extra spacing to tables. */
        table,
        td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }

        /* What it does: Fixes webkit padding issue. */
        table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
        }

        /* What it does: Uses a better rendering method when resizing images in IE. */
        img {
            -ms-interpolation-mode:bicubic;
        }

        /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS.
        Styles for underlined links should be inline. */
        a {
            text-decoration: none;
        }

        /* What it does: A work-around for email clients meddling in triggered links. */
        *[x-apple-data-detectors],  /* iOS */
        .unstyle-auto-detected-links *,
        .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
        .a6S {
            display: none !important;
            opacity: 0.01 !important;
        }

        /* What it does: Prevents Gmail from changing the text color in conversation threads. */
        .im {
            color: inherit !important;
        }

        /* If the above doesn't work, add a .g-img class to any image in question. */
        img.g-img + div {
            display: none !important;
        }

        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
        /* Create one of these media queries for each additional viewport size you'd like to fix */

        /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
            u ~ div .email-container {
                min-width: 320px !important;
            }
        }
        /* iPhone 6, 6S, 7, 8, and X */
        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
            u ~ div .email-container {
                min-width: 375px !important;
            }
        }
        /* iPhone 6+, 7+, and 8+ */
        @media only screen and (min-device-width: 414px) {
            u ~ div .email-container {
                min-width: 414px !important;
            }
        }

        </style>

            <!-- CSS Reset : END -->

            <!-- Progressive Enhancements : BEGIN -->
        <style>

        .primary{
          background: #f3a333;
        }

        .bg_white{
          background: #ffffff;
        }
        .bg_light{
          background: #fafafa;
        }
        .bg_black{
          background: #000000;
        }
        .bg_dark{
          background: rgba(0,0,0,.8);
        }
        .email-section{
          padding:2.5em;
        }

        /*BUTTON*/
        .btn{
          padding: 10px 15px;
        }
        .btn.btn-primary{
          border-radius: 30px;
          background: #f3a333;
          color: #ffffff;
        }



        h1,h2,h3,h4,h5,h6{
          font-family: 'Playfair Display', serif;
          color: #000000;
          margin-top: 0;
        }

        body{
          font-family: 'Montserrat', sans-serif;
          font-weight: 400;
          font-size: 15px;
          line-height: 1.8;
          color: rgba(0,0,0,.4);
        }

        a{
          color: #f3a333;
        }

        table{
        }
        /*LOGO*/

        .logo h1{
          margin: 0;
        }
        .logo h1 a{
          color: #000;
          font-size: 20px;
          font-weight: 700;
          text-transform: uppercase;
          font-family: 'Montserrat', sans-serif;
        }

        /*HERO*/
        .hero{
          position: relative;
        }
        .hero img{

        }
        .hero .text{
          color: rgba(255,255,255,.8);
        }
        .hero .text h2{
          color: #ffffff;
          font-size: 30px;
          margin-bottom: 0;
        }


        /*HEADING SECTION*/
        .heading-section{
        }
        .heading-section h2{
          color: #000000;
          font-size: 28px;
          margin-top: 0;
          line-height: 1.4;
        }
        .heading-section .subheading{
          margin-bottom: 20px !important;
          display: inline-block;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(0,0,0,.4);
          position: relative;
        }
        .heading-section .subheading::after{
          position: absolute;
          left: 0;
          right: 0;
          bottom: -10px;
          content: '';
          width: 100%;
          height: 2px;
          background: #f3a333;
          margin: 0 auto;
        }

        .heading-section-white{
          color: rgba(255,255,255,.8);
        }
        .heading-section-white h2{
          font-size: 28px;
          font-family:
          line-height: 1;
          padding-bottom: 0;
        }
        .heading-section-white h2{
          color: #ffffff;
        }
        .heading-section-white .subheading{
          margin-bottom: 0;
          display: inline-block;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255,255,255,.4);
        }


        .icon{
          text-align: center;
        }
        .icon img{
        }


        /*SERVICES*/
        .text-services{
          padding: 10px 10px 0;
          text-align: center;
        }
        .text-services h3{
          font-size: 20px;
        }

        /*BLOG*/
        .text-services .meta{
          text-transform: uppercase;
          font-size: 14px;
        }

        /*TESTIMONY*/
        .text-testimony .name{
          margin: 0;
        }
        .text-testimony .position{
          color: rgba(0,0,0,.3);

        }


        /*VIDEO*/
        .img{
          width: 100%;
          height: auto;
          position: relative;
        }
        .img .icon{
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          bottom: 0;
          margin-top: -25px;
        }
        .img .icon a{
          display: block;
          width: 60px;
          position: absolute;
          top: 0;
          left: 50%;
          margin-left: -25px;
        }



        /*COUNTER*/
        .counter-text{
          text-align: center;
        }
        .counter-text .num{
          display: block;
          color: #ffffff;
          font-size: 34px;
          font-weight: 700;
        }
        .counter-text .name{
          display: block;
          color: rgba(255,255,255,.9);
          font-size: 13px;
        }


        /*FOOTER*/

        .footer{
          color: rgba(255,255,255,.5);

        }
        .footer .heading{
          color: #ffffff;
          font-size: 20px;
        }
        .footer ul{
          margin: 0;
          padding: 0;
        }
        .footer ul li{
          list-style: none;
          margin-bottom: 10px;
        }
        .footer ul li a{
          color: rgba(255,255,255,1);
        }


        @media screen and (max-width: 500px) {

          .icon{
            text-align: left;
          }

          .text-services{
            padding-left: 0;
            padding-right: 20px;
            text-align: left;
          }

        }

        </style>


        </head>

        <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;">
          <center style="width: 100%; background-color: #f1f1f1;">
            <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;
             font-family: sans-serif;">
              &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
              &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
            </div>
            <div style="max-width: 600px; margin: 0 auto;" class="email-container">
              <!-- BEGIN BODY -->
              <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                <tr>
                  <td class="bg_white logo" style="padding: 1em 2.5em; text-align: center">
                    <h1><a href="#" style="color: #000000;">HariBanEla</a></h1>
                  </td>
                </tr><!-- end tr -->
                <tr>
                  <td valign="middle" class="hero" style="background-image: url(images/bg_1.jpg); background-size: cover; height: 400px;">
                    <table>
                      <tr>
                        <td>
                          <div class="text" style="padding: 0 3em; text-align: center;">
                            <h2>Ooh Shoot - Request Declined</h2>
                          </div>
                        </td>
                        </tr>
                        <tr>
                            <td class="text-services" style="text-align: left;">
                                <p>Hi ${appointment.userName} &comma; </p>
                                <p>${appointment.professionalName} is not available on ${appointment.startTime} to
                                 ${appointment.endTime}. Try another date or find another expert on HariBanEla</p>
                            </td>
                        </tr>
                    </table>
                  </td>
                </tr><!-- end tr -->
              <!-- 1 Column Text + Button : END -->
              </table>
              <!--Footer-->
              <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                <tr>
                <td valign="middle" class="bg_black footer email-section">
                  <table>
                      <tr>
                      <td valign="top" width="33.333%" style="padding-top: 20px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="text-align: left; padding-right: 10px;">
                              <img src="https://res.cloudinary.com/cascadia/image/upload/v1581557749/samples/logo_a3dr7a.png"
                               alt="" style="width: 100%; max-width: 600px; height: auto; margin: auto; display: block;">
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td valign="top" width="33.333%" style="padding-top: 20px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                              <tr>
                              <td style="text-align: left; padding-right: 10px;">
                                  <h3 class="heading">HariBanEla</h3>
                                  <p>A small team's dream of creating a Sri Lankan Stackoverflow</p>
                              </td>
                              </tr>
                          </table>
                          </td>
                      <td valign="top" width="33.333%" style="padding-top: 20px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                                <h3 class="heading">Contact Info</h3>
                                <ul>
                                          <li><span class="text">203 Fake St. Fake Town, Colombo, Sri Lanka</span></li>
                                          <li><span class="text">+94 392 3929</span></a></li>
                                        </ul>
                            </td>

                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr><!-- end: tr -->
              <tr>
                  <td valign="middle" class="bg_black footer email-section">
                      <table>
                      <tr>
                      <td valign="top" width="33.333%">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="text-align: left; padding-right: 10px;">
                                <p>&copy; 2020 HariBanEla.lk All Rights Reserved</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td valign="top" width="33.333%">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="text-align: right; padding-left: 5px; padding-right: 5px;">
                                <p><a href="#" style="color: rgba(255,255,255,.4);">Unsubcribe</a></p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  </td>
              </tr>
            </table>

            </div>
          </center>
        </body>
        </html>
  `
      };
    }
    sgMail.send(msg, function(err, info) {
      if (err) {
        winston.error(
          `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
            req.method
          } - ${req.ip}`
        );
        return;
      }
      winston.info(
        `200 - Email has been Sent. -  ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
      res.json(updatedAppointment);
      // res.json({ success: true, msg: 'Email has been Sent.' });
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

appointmentRouter.post('/payment/:id', async function(req, res, next) {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (req.body.paymentStatus === 'Paid') {
      appointment.paymentStatus = 'Paid';
      console.log(appointment.userId);
      createUser(appointment.userName, appointment.userName);
      createUser(appointment.professionalName, appointment.professionalName);
      createRoom(
        appointment.id,
        appointment.userName,
        appointment.professionalName
      );
      appointment.chatUrl =
        'https://haribnela.herokuapp.com/chat/' + appointment.id;
    } else {
      appointment.paymentStatus = 'Not paid';
    }
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      appointment,
      { new: true }
    );
    winston.info(
      `200 - appointment updated. - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    const msgUser = {
      to: updatedAppointment.userEmail,
      from: 'Appointmet@haribnela.lk',
      subject: 'Appointment Confrimed',
      text: ` Appointment Confirmed
              Your appointment with ${updatedAppointment.professionalName} is confirmed.
              Please visit ${updatedAppointment.chatUrl} on ${updatedAppointment.startTime} to begin session. `,
      html: `
      <!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
       xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
          <meta charset="utf-8"> <!-- utf-8 works for most cases -->
          <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
          <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
          <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
          <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->


          <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i" rel="stylesheet">

          <!-- CSS Reset : BEGIN -->
      <style>

      html,
      body {
          margin: 0 auto !important;
          padding: 0 !important;
          height: 100% !important;
          width: 100% !important;
          background: #f1f1f1;
      }

      /* What it does: Stops email clients resizing small text. */
      * {
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
      }

      /* What it does: Centers email on Android 4.4 */
      div[style*="margin: 16px 0"] {
          margin: 0 !important;
      }

      /* What it does: Stops Outlook from adding extra spacing to tables. */
      table,
      td {
          mso-table-lspace: 0pt !important;
          mso-table-rspace: 0pt !important;
      }

      /* What it does: Fixes webkit padding issue. */
      table {
          border-spacing: 0 !important;
          border-collapse: collapse !important;
          table-layout: fixed !important;
          margin: 0 auto !important;
      }

      /* What it does: Uses a better rendering method when resizing images in IE. */
      img {
          -ms-interpolation-mode:bicubic;
      }

      /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
      a {
          text-decoration: none;
      }

      /* What it does: A work-around for email clients meddling in triggered links. */
      *[x-apple-data-detectors],  /* iOS */
      .unstyle-auto-detected-links *,
      .aBn {
          border-bottom: 0 !important;
          cursor: default !important;
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
      }

      /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
      .a6S {
          display: none !important;
          opacity: 0.01 !important;
      }

      /* What it does: Prevents Gmail from changing the text color in conversation threads. */
      .im {
          color: inherit !important;
      }

      /* If the above doesn't work, add a .g-img class to any image in question. */
      img.g-img + div {
          display: none !important;
      }

      /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
      /* Create one of these media queries for each additional viewport size you'd like to fix */

      /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
          u ~ div .email-container {
              min-width: 320px !important;
          }
      }
      /* iPhone 6, 6S, 7, 8, and X */
      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
          u ~ div .email-container {
              min-width: 375px !important;
          }
      }
      /* iPhone 6+, 7+, and 8+ */
      @media only screen and (min-device-width: 414px) {
          u ~ div .email-container {
              min-width: 414px !important;
          }
      }

      </style>

          <!-- CSS Reset : END -->

          <!-- Progressive Enhancements : BEGIN -->
      <style>

      .primary{
        background: #f3a333;
      }

      .bg_white{
        background: #ffffff;
      }
      .bg_light{
        background: #fafafa;
      }
      .bg_black{
        background: #000000;
      }
      .bg_dark{
        background: rgba(0,0,0,.8);
      }
      .email-section{
        padding:2.5em;
      }

      /*BUTTON*/
      .btn{
        padding: 10px 15px;
      }
      .btn.btn-primary{
        border-radius: 30px;
        background: #f3a333;
        color: #ffffff;
      }



      h1,h2,h3,h4,h5,h6{
        font-family: 'Playfair Display', serif;
        color: #000000;
        margin-top: 0;
      }

      body{
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.8;
        color: rgba(0,0,0,.4);
      }

      a{
        color: #f3a333;
      }

      table{
      }
      /*LOGO*/

      .logo h1{
        margin: 0;
      }
      .logo h1 a{
        color: #000;
        font-size: 20px;
        font-weight: 700;
        text-transform: uppercase;
        font-family: 'Montserrat', sans-serif;
      }

      /*HERO*/
      .hero{
        position: relative;
      }
      .hero img{

      }
      .hero .text{
        color: rgba(255,255,255,.8);
      }
      .hero .text h2{
        color: #ffffff;
        font-size: 30px;
        margin-bottom: 0;
      }


      /*HEADING SECTION*/
      .heading-section{
      }
      .heading-section h2{
        color: #000000;
        font-size: 28px;
        margin-top: 0;
        line-height: 1.4;
      }
      .heading-section .subheading{
        margin-bottom: 20px !important;
        display: inline-block;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: rgba(0,0,0,.4);
        position: relative;
      }
      .heading-section .subheading::after{
        position: absolute;
        left: 0;
        right: 0;
        bottom: -10px;
        content: '';
        width: 100%;
        height: 2px;
        background: #f3a333;
        margin: 0 auto;
      }

      .heading-section-white{
        color: rgba(255,255,255,.8);
      }
      .heading-section-white h2{
        font-size: 28px;
        font-family:
        line-height: 1;
        padding-bottom: 0;
      }
      .heading-section-white h2{
        color: #ffffff;
      }
      .heading-section-white .subheading{
        margin-bottom: 0;
        display: inline-block;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: rgba(255,255,255,.4);
      }


      .icon{
        text-align: center;
      }
      .icon img{
      }


      /*SERVICES*/
      .text-services{
        padding: 10px 10px 0;
        text-align: center;
      }
      .text-services h3{
        font-size: 20px;
      }

      /*BLOG*/
      .text-services .meta{
        text-transform: uppercase;
        font-size: 14px;
      }

      /*TESTIMONY*/
      .text-testimony .name{
        margin: 0;
      }
      .text-testimony .position{
        color: rgba(0,0,0,.3);

      }


      /*VIDEO*/
      .img{
        width: 100%;
        height: auto;
        position: relative;
      }
      .img .icon{
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        bottom: 0;
        margin-top: -25px;
      }
      .img .icon a{
        display: block;
        width: 60px;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -25px;
      }



      /*COUNTER*/
      .counter-text{
        text-align: center;
      }
      .counter-text .num{
        display: block;
        color: #ffffff;
        font-size: 34px;
        font-weight: 700;
      }
      .counter-text .name{
        display: block;
        color: rgba(255,255,255,.9);
        font-size: 13px;
      }


      /*FOOTER*/

      .footer{
        color: rgba(255,255,255,.5);

      }
      .footer .heading{
        color: #ffffff;
        font-size: 20px;
      }
      .footer ul{
        margin: 0;
        padding: 0;
      }
      .footer ul li{
        list-style: none;
        margin-bottom: 10px;
      }
      .footer ul li a{
        color: rgba(255,255,255,1);
      }


      @media screen and (max-width: 500px) {

        .icon{
          text-align: left;
        }

        .text-services{
          padding-left: 0;
          padding-right: 20px;
          text-align: left;
        }

      }

      </style>


      </head>

      <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;">
        <center style="width: 100%; background-color: #f1f1f1;">
          <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;
          font-family: sans-serif;">
            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
            &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
          </div>
          <div style="max-width: 600px; margin: 0 auto;" class="email-container">
            <!-- BEGIN BODY -->
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
              <tr>
                <td class="bg_white logo" style="padding: 1em 2.5em; text-align: center">
                  <h1><a href="#" style="color: #000000;">HariBanEla</a></h1>
                </td>
              </tr><!-- end tr -->
              <tr>
                <td valign="middle" class="hero" style="background-image: url(images/bg_1.jpg); background-size: cover; height: 400px;">
                  <table>
                    <tr>
                      <td>
                        <div class="text" style="padding: 0 3em; text-align: center;">
                          <h2>Appointment Confirmed </h2>
                        </div>
                      </td>
                      </tr>
                      <tr>
                          <td class="text-services" style="text-align: left;">
                              <p>Hi ${appointment.userName} &comma; </p>
                              <p>Your appointment with ${appointment.professionalName}
                                is confirmed. Please visit the below chat on ${appointment.startTime}. to begin session.</p>
                              <p><a href=${appointment.chatUrl} class="btn btn-primary" style="text-align: center;
                               padding:24px; border-radius: 30px; background: #000000; color: #ffffff;">Go to Chat</a></p>
                              <p>Chat Url - ${appointment.chatUrl} </p>
                          </td>
                      </tr>
                  </table>
                </td>
              </tr><!-- end tr -->
            <!-- 1 Column Text + Button : END -->
            </table>
            <!--Footer-->
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
              <tr>
              <td valign="middle" class="bg_black footer email-section">
                <table>
                    <tr>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-right: 10px;">
                            <img src="https://res.cloudinary.com/cascadia/image/upload/v1581557749/samples/logo_a3dr7a.png"
                            alt="" style="width: 100%; max-width: 600px; height: auto; margin: auto; display: block;">
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                            <td style="text-align: left; padding-right: 10px;">
                                <h3 class="heading">HariBanEla</h3>
                                <p>A small team's dream of creating a Sri Lankan Stackoverflow</p>
                            </td>
                            </tr>
                        </table>
                        </td>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                              <h3 class="heading">Contact Info</h3>
                              <ul>
                                        <li><span class="text">203 Fake St. Fake Town, Colombo, Sri Lanka</span></li>
                                        <li><span class="text">+94 392 3929</span></a></li>
                                      </ul>
                          </td>

                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr><!-- end: tr -->
            <tr>
                <td valign="middle" class="bg_black footer email-section">
                    <table>
                    <tr>
                    <td valign="top" width="33.333%">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-right: 10px;">
                              <p>&copy; 2020 HariBanEla.lk All Rights Reserved</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="33.333%">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: right; padding-left: 5px; padding-right: 5px;">
                              <p><a href="#" style="color: rgba(255,255,255,.4);">Unsubcribe</a></p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                </td>
            </tr>
          </table>
          </div>
        </center>
      </body>
      </html>`
    };
    const msgPro = {
      to: updatedAppointment.userEmail,
      from: 'Appointmet@haribnela.lk',
      subject: 'Appointment Confrimed',
      text: ` Appointment Confirmed
              Your appointment with ${updatedAppointment.userName}  is confirmed.
              Please visit ${updatedAppointment.chatUrl} on ${updatedAppointment.startTime} to begin session. `,
      html: `
      <!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
       xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
          <meta charset="utf-8"> <!-- utf-8 works for most cases -->
          <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
          <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
          <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
          <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->


          <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i" rel="stylesheet">

          <!-- CSS Reset : BEGIN -->
      <style>

      html,
      body {
          margin: 0 auto !important;
          padding: 0 !important;
          height: 100% !important;
          width: 100% !important;
          background: #f1f1f1;
      }

      /* What it does: Stops email clients resizing small text. */
      * {
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
      }

      /* What it does: Centers email on Android 4.4 */
      div[style*="margin: 16px 0"] {
          margin: 0 !important;
      }

      /* What it does: Stops Outlook from adding extra spacing to tables. */
      table,
      td {
          mso-table-lspace: 0pt !important;
          mso-table-rspace: 0pt !important;
      }

      /* What it does: Fixes webkit padding issue. */
      table {
          border-spacing: 0 !important;
          border-collapse: collapse !important;
          table-layout: fixed !important;
          margin: 0 auto !important;
      }

      /* What it does: Uses a better rendering method when resizing images in IE. */
      img {
          -ms-interpolation-mode:bicubic;
      }

      /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
      a {
          text-decoration: none;
      }

      /* What it does: A work-around for email clients meddling in triggered links. */
      *[x-apple-data-detectors],  /* iOS */
      .unstyle-auto-detected-links *,
      .aBn {
          border-bottom: 0 !important;
          cursor: default !important;
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
      }

      /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
      .a6S {
          display: none !important;
          opacity: 0.01 !important;
      }

      /* What it does: Prevents Gmail from changing the text color in conversation threads. */
      .im {
          color: inherit !important;
      }

      /* If the above doesn't work, add a .g-img class to any image in question. */
      img.g-img + div {
          display: none !important;
      }

      /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
      /* Create one of these media queries for each additional viewport size you'd like to fix */

      /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
          u ~ div .email-container {
              min-width: 320px !important;
          }
      }
      /* iPhone 6, 6S, 7, 8, and X */
      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
          u ~ div .email-container {
              min-width: 375px !important;
          }
      }
      /* iPhone 6+, 7+, and 8+ */
      @media only screen and (min-device-width: 414px) {
          u ~ div .email-container {
              min-width: 414px !important;
          }
      }

      </style>

          <!-- CSS Reset : END -->

          <!-- Progressive Enhancements : BEGIN -->
      <style>

      .primary{
        background: #f3a333;
      }

      .bg_white{
        background: #ffffff;
      }
      .bg_light{
        background: #fafafa;
      }
      .bg_black{
        background: #000000;
      }
      .bg_dark{
        background: rgba(0,0,0,.8);
      }
      .email-section{
        padding:2.5em;
      }

      /*BUTTON*/
      .btn{
        padding: 10px 15px;
      }
      .btn.btn-primary{
        border-radius: 30px;
        background: #f3a333;
        color: #ffffff;
      }



      h1,h2,h3,h4,h5,h6{
        font-family: 'Playfair Display', serif;
        color: #000000;
        margin-top: 0;
      }

      body{
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.8;
        color: rgba(0,0,0,.4);
      }

      a{
        color: #f3a333;
      }

      table{
      }
      /*LOGO*/

      .logo h1{
        margin: 0;
      }
      .logo h1 a{
        color: #000;
        font-size: 20px;
        font-weight: 700;
        text-transform: uppercase;
        font-family: 'Montserrat', sans-serif;
      }

      /*HERO*/
      .hero{
        position: relative;
      }
      .hero img{

      }
      .hero .text{
        color: rgba(255,255,255,.8);
      }
      .hero .text h2{
        color: #ffffff;
        font-size: 30px;
        margin-bottom: 0;
      }


      /*HEADING SECTION*/
      .heading-section{
      }
      .heading-section h2{
        color: #000000;
        font-size: 28px;
        margin-top: 0;
        line-height: 1.4;
      }
      .heading-section .subheading{
        margin-bottom: 20px !important;
        display: inline-block;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: rgba(0,0,0,.4);
        position: relative;
      }
      .heading-section .subheading::after{
        position: absolute;
        left: 0;
        right: 0;
        bottom: -10px;
        content: '';
        width: 100%;
        height: 2px;
        background: #f3a333;
        margin: 0 auto;
      }

      .heading-section-white{
        color: rgba(255,255,255,.8);
      }
      .heading-section-white h2{
        font-size: 28px;
        font-family:
        line-height: 1;
        padding-bottom: 0;
      }
      .heading-section-white h2{
        color: #ffffff;
      }
      .heading-section-white .subheading{
        margin-bottom: 0;
        display: inline-block;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: rgba(255,255,255,.4);
      }


      .icon{
        text-align: center;
      }
      .icon img{
      }


      /*SERVICES*/
      .text-services{
        padding: 10px 10px 0;
        text-align: center;
      }
      .text-services h3{
        font-size: 20px;
      }

      /*BLOG*/
      .text-services .meta{
        text-transform: uppercase;
        font-size: 14px;
      }

      /*TESTIMONY*/
      .text-testimony .name{
        margin: 0;
      }
      .text-testimony .position{
        color: rgba(0,0,0,.3);

      }


      /*VIDEO*/
      .img{
        width: 100%;
        height: auto;
        position: relative;
      }
      .img .icon{
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        bottom: 0;
        margin-top: -25px;
      }
      .img .icon a{
        display: block;
        width: 60px;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -25px;
      }



      /*COUNTER*/
      .counter-text{
        text-align: center;
      }
      .counter-text .num{
        display: block;
        color: #ffffff;
        font-size: 34px;
        font-weight: 700;
      }
      .counter-text .name{
        display: block;
        color: rgba(255,255,255,.9);
        font-size: 13px;
      }


      /*FOOTER*/

      .footer{
        color: rgba(255,255,255,.5);

      }
      .footer .heading{
        color: #ffffff;
        font-size: 20px;
      }
      .footer ul{
        margin: 0;
        padding: 0;
      }
      .footer ul li{
        list-style: none;
        margin-bottom: 10px;
      }
      .footer ul li a{
        color: rgba(255,255,255,1);
      }


      @media screen and (max-width: 500px) {

        .icon{
          text-align: left;
        }

        .text-services{
          padding-left: 0;
          padding-right: 20px;
          text-align: left;
        }

      }

      </style>


      </head>

      <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;">
        <center style="width: 100%; background-color: #f1f1f1;">
          <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;
          font-family: sans-serif;">
            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
            &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
          </div>
          <div style="max-width: 600px; margin: 0 auto;" class="email-container">
            <!-- BEGIN BODY -->
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
              <tr>
                <td class="bg_white logo" style="padding: 1em 2.5em; text-align: center">
                  <h1><a href="#" style="color: #000000;">HariBanEla</a></h1>
                </td>
              </tr><!-- end tr -->
              <tr>
                <td valign="middle" class="hero" style="background-image: url(images/bg_1.jpg); background-size: cover; height: 400px;">
                  <table>
                    <tr>
                      <td>
                        <div class="text" style="padding: 0 3em; text-align: center;">
                          <h2>Appointment Confirmed </h2>
                        </div>
                      </td>
                      </tr>
                      <tr>
                          <td class="text-services" style="text-align: left;">
                              <p>Hi ${appointment.professionalName}   &comma; </p>
                              <p>Your appointment with ${appointment.userName}
                                is confirmed. Please visit the below chat on ${appointment.startTime}. to begin session.</p>
                              <p><a href=${appointment.chatUrl} class="btn btn-primary" style="text-align: center;
                               padding:24px; border-radius: 30px; background: #000000; color: #ffffff;">Go to Chat</a></p>
                              <p>Chat Url - ${appointment.chatUrl} </p>
                          </td>
                      </tr>
                  </table>
                </td>
              </tr><!-- end tr -->
            <!-- 1 Column Text + Button : END -->
            </table>
            <!--Footer-->
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
              <tr>
              <td valign="middle" class="bg_black footer email-section">
                <table>
                    <tr>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-right: 10px;">
                            <img src="https://res.cloudinary.com/cascadia/image/upload/v1581557749/samples/logo_a3dr7a.png"
                            alt="" style="width: 100%; max-width: 600px; height: auto; margin: auto; display: block;">
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                            <td style="text-align: left; padding-right: 10px;">
                                <h3 class="heading">HariBanEla</h3>
                                <p>A small team's dream of creating a Sri Lankan Stackoverflow</p>
                            </td>
                            </tr>
                        </table>
                        </td>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                              <h3 class="heading">Contact Info</h3>
                              <ul>
                                        <li><span class="text">203 Fake St. Fake Town, Colombo, Sri Lanka</span></li>
                                        <li><span class="text">+94 392 3929</span></a></li>
                                      </ul>
                          </td>

                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr><!-- end: tr -->
            <tr>
                <td valign="middle" class="bg_black footer email-section">
                    <table>
                    <tr>
                    <td valign="top" width="33.333%">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-right: 10px;">
                              <p>&copy; 2020 HariBanEla.lk All Rights Reserved</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="33.333%">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: right; padding-left: 5px; padding-right: 5px;">
                              <p><a href="#" style="color: rgba(255,255,255,.4);">Unsubcribe</a></p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                </td>
            </tr>
          </table>
          </div>
        </center>
      </body>
      </html>`
    };
    sgMail.send(msgUser, function(err, info) {
      if (err) {
        winston.error(
          `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
        );
        return;
      }
      winston.info(
        `200 - Email has been Sent to user. -  ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    });
    sgMail.send(msgPro, function(err, info) {
      if (err) {
        winston.error(
          `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
        );
        return;
      }
      winston.info(
        `200 - Email has been Sent to Professional. -  ${req.originalUrl} - ${req.method} - ${req.ip}`
      );


    });
    res.json({ success: true, msg: 'Email has been Sent.' });
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
//   DELETE BOOKING BY ID
appointmentRouter.delete('/:id', async function(req, res, next) {
  try {
    const appointment = await Appointment.findByIdAndRemove(
      req.params.id,
      req.body
    );
    winston.info(
      `200 - Deleted the appointment sucessful - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    res.json(appointment);
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

const createRoom = function(roomId, clientId, professionalId) {
  chatkit
    .createRoom({
      id: roomId,
      creatorId: professionalId,
      name: 'Chat',
      isPrivate: true,
      userIds: [clientId, professionalId]
    })
    .then(() => {
      console.log('Room created successfully');
    })
    .catch(err => {
      console.log(err);
    });
};
const createUser = function(userId, userName) {
  chatkit
    .createUser({ id: userId, name: userName })
    .then(() => {
      // res.sendStatus(201);
    })
    .catch(err => {
      if (err.error === 'services/chatkit/user_already_exists') {
        console.log(`User already exists: ${userId}`);
        // res.sendStatus(200);
      } else {
        // res.status(err.status).json(err);
      }
    });
};
const addUsersToRoom = function(clientId, professionalId, room) {
  chatkit
    .addUsersToRoom({
      roomId: room.id,
      userIds: [clientId, professionalId]
    })
    .then(() => console.log('added'))
    .catch(err => console.error(err));
};
