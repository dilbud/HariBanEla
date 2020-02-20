const report = require('../models/reportModel');
const user = require('../models/userModel');
var generator = require('generate-password');
var SHA256 = require('crypto-js/sha256');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(
  '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'
);
// set feedback
const feedbackSet = (req, res, next) => {
  new report({
    type: req.body.type,
    userId: req.body.userId,
    name: req.body.name,
    email: req.body.email,
    content: req.body.content
  }).save((err, data) => {
    if (err) {
      res.status(500).json({ msg: 'internal server error' });
    } else {
      res.status(200).json({ msg: 'feedback is recorded' });
    }
  });
};

// get all feedback
const feedbackGet = (req, res, next) => {
  report.find(
    { type: 'feedback' },
    { useFindAndModify: false },
    (err, data) => {
      if (err) {
        return res.status(500).json({ msg: 'internal server error' });
      } else {
        res.status(200).json({
          msg: 'ok',
          serverData: data
        });
      }
    }
  );
};
// delete feedback
const feedbackDelete = (req, res, next) => {
  report.findByIdAndDelete(req.body.id, (err, data) => {
    if (err) {
      res.status(500).json({ msg: 'internal server error' });
    } else {
      if (data !== null) {
        res.status(200).json({ msg: 'feedback remove' });
      } else {
        res.status(404).json({ msg: 'feedback does not exist' });
      }
    }
  });
};

// reset password
const setPassword = (req, res, next) => {
  var password = generator.generate({
    length: 10,
    numbers: true
  });
  const hash = SHA256(password);
  const email = req.body.email;
  console.log(email);
  user.findOneAndUpdate(
    { email: email },
    { password: hash },
    { new: true, select: 'email firstName lastName' },
    (err, data) => {
      if (err) {
        res.status(500).json({ msg: 'internal server error' });
      } else {
        if (data !== null) {
          name = data.firstName + ' ' + data.lastName;
          const msg = {
            to: data.email,
            from: 'Administrator@haribnela.lk',
            subject: 'Reset Password form HARIBANELA',
            text: 'your password reset by administrator',
            html: `<!DOCTYPE html>
            <!-- saved from url=(0034)file:///E:/Downloads/rejected.html -->
            <body lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                 <!-- utf-8 works for most cases -->
                <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
                <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
                <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
                <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->
                <link href="./resetpassword_files/css" rel="stylesheet">
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
                <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
                  ‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
                </div>
                <div style="max-width: 600px; margin: 0 auto;" class="email-container">
                  <!-- BEGIN BODY -->
                  <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                    <tbody><tr>
                      <td class="bg_white logo" style="padding: 1em 2.5em; text-align: center">
                        <h1><a href="file:///E:/Downloads/rejected.html#" style="color: #000000;">HariBanEla</a></h1>
                      </td>
                    </tr><!-- end tr -->
                    <tr>
                      <td valign="middle" class="hero" style="background-image: url(images/bg_1.jpg); background-size: cover; height: 400px;">
                        <table>
                          <tbody><tr>
                            <td>
                              <div class="text" style="padding: 0 3em; text-align: center;">
                                <h2>Your Password Is Reset Successfuly</h2>
                              </div>
                            </td>
                            </tr>
                            <tr>
                                <td class="text-services" style="text-align: left;">
                                    <p>Hi ${name} , </p>
                                    <p>This is your New Password</p>
                                    <p><b>${password}</b></p>
                                </td>
                            </tr>
                        </tbody></table>
                      </td>
                    </tr><!-- end tr -->
                  <!-- 1 Column Text + Button : END -->
                  </tbody></table>
                  <!--Footer-->
                  <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                    <tbody><tr>
                    <td valign="middle" class="bg_black footer email-section">
                      <table>
                          <tbody><tr>
                          <td valign="top" width="33.333%" style="padding-top: 20px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                              <tbody><tr>
                                <td style="text-align: left; padding-right: 10px;">
                                  <img src="./resetpassword_files/logo_a3dr7a.png" alt="" style="width: 100%; max-width: 600px; height: auto; margin: auto; display: block;">
                                </td>
                              </tr>
                            </tbody></table>
                          </td>
                          <td valign="top" width="33.333%" style="padding-top: 20px;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                  <tbody><tr>
                                  <td style="text-align: left; padding-right: 10px;">
                                      <h3 class="heading">HariBanEla</h3>
                                      <p>A small team's dream of creating a Sri Lankan Stackoverflow</p>
                                  </td>
                                  </tr>
                              </tbody></table>
                              </td>
                          <td valign="top" width="33.333%" style="padding-top: 20px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                              <tbody><tr>
                                <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                                    <h3 class="heading">Contact Info</h3>
                                    <ul>
                                              <li><span class="text">203 Fake St. Fake Town, Colombo, Sri Lanka</span></li>
                                              <li><span class="text">+94 392 3929</span></li>
                                            </ul>
                                </td>
                              </tr>
                            </tbody></table>
                          </td>
                        </tr>
                      </tbody></table>
                    </td>
                  </tr><!-- end: tr -->
                  <tr>
                      <td valign="middle" class="bg_black footer email-section">
                          <table>
                          <tbody><tr>
                          <td valign="top" width="33.333%">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                              <tbody><tr>
                                <td style="text-align: left; padding-right: 10px;">
                                    <p>© 2020 HariBanEla.lk All Rights Reserved</p>
                                </td>
                              </tr>
                            </tbody></table>
                          </td>
                          <td valign="top" width="33.333%">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                              <tbody><tr>
                                <td style="text-align: right; padding-left: 5px; padding-right: 5px;">
                                    <p><a href="file:///E:/Downloads/rejected.html#" style="color: rgba(255,255,255,.4);">Unsubcribe</a></p>
                                </td>
                              </tr>
                            </tbody></table>
                          </td>
                        </tr>
                      </tbody></table>
                      </td>
                  </tr>
                </tbody></table>
                </div>
              </center>
            </body></body>`
          };
          sgMail.send(msg, function(err, info) {
            if (err) {
              console.log('jasdjhasdh', err);
            } else {
              res.status(200).json({ msg: 'check email box' });
            }
          });
        } else {
          res.status(404).json({ msg: 'user does not exist' });
        }
      }
    }
  );
};
// set reported post
const setPost = (req, res, next) => {
  new report({
    type: req.body.type,
    userId: req.body.userId,
    name: req.body.name,
    email: req.body.email,
    content: req.body.content,
    reportedUserId: req.body.reportedUserId,
    reportedUserName: req.body.reportedUserName,
    reportedPostId: req.body.reportedPostId
  }).save((err, data) => {
    if (err) {
      res.status(500).json({ msg: 'internal server error' });
    } else {
      res.status(200).json({ msg: 'report is recorded' });
    }
  });
};
// get all reported post
const getPost = (req, res, next) => {
  report.find(
    { type: 'reportPost' },
    { useFindAndModify: false },
    (err, data) => {
      if (err) {
        return res.status(500).json({ msg: 'internal server error' });
      } else {
        res.status(200).json({
          msg: 'ok',
          serverData: data
        });
      }
    }
  );
};
// delete reported post
const deletePost = (req, res, next) => {
  report.findByIdAndDelete(req.body.id, (err, data) => {
    if (err) {
      res.status(500).json({ msg: 'internal server error' });
    } else {
      if (data !== null) {
        res.status(200).json({ msg: 'post Report remove' });
      } else {
        res.status(404).json({ msg: 'report does not exist' });
      }
    }
  });
};
// set report user
const setUser = (req, res, next) => {
  new report({
    type: req.body.type,
    userId: req.body.userId,
    name: req.body.name,
    email: req.body.email,
    content: req.body.content,
    reportedUserId: req.body.reportedUserId,
    reportedUserName: req.body.reportedUserName,
    reportedPostId: req.body.reportedPostId
  }).save((err, data) => {
    if (err) {
      res.status(500).json({ msg: 'internal server error' });
    } else {
      res.status(200).json({ msg: 'report is recorded' });
    }
  });
};
// get all reported user
const getReportUser = (req, res, next) => {
  report.find(
    { type: 'reportUser' },
    { useFindAndModify: false },
    (err, data) => {
      if (err) {
        return res.status(500).json({ msg: 'internal server error' });
      } else {
        res.status(200).json({
          msg: 'ok',
          serverData: data
        });
      }
    }
  );
};
// delete reported user
const deleteReportUser = (req, res, next) => {
  report.findByIdAndDelete(req.body.id, (err, data) => {
    if (err) {
      res.status(500).json({ msg: 'internal server error' });
    } else {
      if (data !== null) {
        res.status(200).json({ msg: 'User Report remove' });
      } else {
        res.status(404).json({ msg: 'report does not exist' });
      }
    }
  });
};

module.exports = {
  feedbackSet: feedbackSet,
  feedbackGet: feedbackGet,
  feedbackDelete: feedbackDelete,

  password: setPassword,

  reportPost: setPost,
  getReportPost: getPost,
  deleteReportPost: deletePost,

  reportUser: setUser,
  getReportUser: getReportUser,
  deleteReportUser: deleteReportUser
};
