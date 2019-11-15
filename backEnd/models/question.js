const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    body: { type: String }
});

const answerSchema = mongoose.Schema({
    body: { type: String },
    votes: { type: Number },
    comments: { type: [commentSchema] }
});

const questionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    answerCount: {
        type: Number
    },
    answers: {
        type: [answerSchema]
    },
    comments: {
        type: [commentSchema]
    },
    tags: {
        type: Array
    },
    views: {
        type: Number
    },
    votes: {
        type: Number
    }
});

module.exports = mongoose.model('questions', questionSchema);
