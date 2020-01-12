const report = require('../models/reportModel');

const feedback = (req, res, next) => {
    console.log(req.body);
    new report({
        type: { type: String, required: true },
        userId: { type: String, required: false },
        name: { type: String, required: false },
        email: { type: String, required: true },
        date: { type: Date, required: false, default: Date.now },
        content: { type: String, required: false },
      })
}

const resetPassword = (req, res, next) => {

}

const reportPost = (req, res, next) => {

}

const reportUser = (req, res, next) => {

}

module.exports = { feedback: feedback, resetPassword: resetPassword, reportPost: reportPost, reportUser: reportUser };