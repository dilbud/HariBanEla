const express = require('express');
const Question = require('../models/question');

const router = express.Router();

// Create question
router.post('/', async (req, res) => {
    const question = new Question({
        title: req.body.title,
        category: req.body.category,
        body: req.body.body,
        userId: req.body.userId,
        answerCount: 0,
        answers: [],
        tags: req.body.tags,
        views: 0,
        votes: 0,
    });
    // console.log(question);
    try {
        const saved = await question.save();
        res.json(saved);
    } catch (error) {
        res.json({ Emessage: error });
    }
});

// get questions
router.get('/', async (req, res) => {
  try {
    const received = await Question.find();
    res.json(received);
  } catch (error) {
    res.json({Emessage: error});
  }
});

// get question
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const received = await Question.findById(id);
    if (!req.query.refresh) {
      received.views++;
    }
    const saved = await Question.findByIdAndUpdate(id, received, {new: true});
    res.json(saved);
  } catch (error) {
    res.json({Emessage: error});
  }
});

// Vote question
router.get('/:id/vote', async (req, res) => {
  try {
    const id = req.params.id;
    const received = await Question.findById(id);
    if (req.query.vote == 1) {
      received.votes++;
    } else {
      received.votes--;
    }
    const saved = await Question.findByIdAndUpdate(id, received, {new: true});
    res.json(saved);
  } catch (error) {
    res.json({Emessage: error});
  }
});

// Edit question
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const question = req.body;
    const saved = await Question.findByIdAndUpdate(id, question, {new: true});
    res.json(saved);
  } catch (error) {
    res.json({Emessage: error});
  }
});

// Delete question
router.delete('/:id', async (req, res) => {
  try {
    const removed = await Question.remove({_id: req.params.id});
    res.json(removed);
  } catch (error) {
    res.json({message: error});
  }
});

// Add answer
router.put('/:id/answers', async (req, res) => {
    // console.log(req);
    const answer = {
        body: req.body.body,
        userId: req.body.userId,
        votes: 0,
    };
    try {
        const id = req.params.id;
        const parent = await Question.findById(id);
        parent.answers.push(answer);
        parent.answerCount++;
        const saved = await parent.save();
        res.json(saved);
    } catch (error) {
        res.json({ Emessage: error });
    }
});

// edit answer
router.put('/:questionId/answers/:answerId', async (req, res) => {
  const questionId = req.params.questionId;
  const answerId = req.params.answerId;
  try {
    const received = await Question.findById(questionId);
    for (const answer of received.answers) {
      if (answer._id == answerId) {
        answer.body=req.body.body;
        break;
      }
    };
    const saved = await Question.findByIdAndUpdate(questionId, received, {new: false});
    res.json(saved);
  } catch (error) {
    res.json({Emessage: error});
  }
});

// Vote answer
router.get('/:questionId/answers/:answerId/vote', async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const answerId = req.params.answerId;
    const received = await Question.findById(questionId);
    for (const answer of received.answers) {
      if (answer._id == answerId) {
        if (req.query.vote == 1) {
          answer.votes++;
        } else {
          answer.votes--;
        }
        break;
      }
    };
    const saved = await Question.findByIdAndUpdate(questionId, received, {new: false});
    res.json(saved);
  } catch (error) {
    res.json({Emessage: error});
  }
});

// Add comment to question
router.put('/:questionId/comments', async (req, res) => {
  console.log('req.body');
  const comment = {
    body: req.body.body,
  };
  try {
    console.log('req.body');
    const questionId = req.params.questionId;
    const question = await Question.findById(questionId);
    question.comments.push(comment);
    const saved = await question.save();
    console.log(saved);
    res.json(saved);
  } catch (error) {
    res.json({Emessage: error});
  }
});

// Add comment to answer
router.put('/:questionId/answers/:answerId/comments', async (req, res) => {
  const comment = {
    body: req.body.body,
  };
  try {
    const questionId = req.params.questionId;
    const answerId = req.params.answerId;
    const question = await Question.findById(questionId);
    for (const answer of question.answers) {
      if (answer._id == answerId) {
        answer.comments.push(comment);
        break;
      }
    }
    const saved = await question.save();
    res.json(saved);
  } catch (error) {
    res.json({Emessage: error});
  }
});

module.exports = router;
