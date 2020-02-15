const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

const answerSchema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: true
    },
    comments: {
        type: [commentSchema],
        required: true
    },
    voters: {
        type: [{
            userId: String,
            upDown: Number // up=1 down=2
        }],
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    isAccepted: {
        type: Boolean,
        required: true
    }
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
    userId: {
        type: String,
        required: true
    },
    answers: {
        type: [answerSchema],
        required: true
    },
    comments: {
        type: [commentSchema],
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    views: {
        type: Number,
        required: true
    },
    votes: {
        type: Number,
        required: true
    },
    voters: {
        type: [{
            userId: String,
            upDown: Number // up=1 down=2
        }],
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('questions', questionSchema);
