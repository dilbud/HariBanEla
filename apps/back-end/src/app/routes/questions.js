const express = require('express');
const Question = require('../models/question');

export const questionRouter = express.Router();

// Create question
questionRouter.post('/', async (req, res) => {
  const question = new Question({
    title: req.body.title,
    category: req.body.category,
    body: req.body.body,
    userId: req.body.userId,
    answers: [],
    tags: req.body.tags,
    views: 0,
    votes: 0,
    createdAt: Date.now()
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
questionRouter.get('/', async (req, res) => {
  try {
    const received = await Question.find();
    res.json(received);
  } catch (error) {
    res.json({ Emessage: error });
  }
});

// get questions of user
questionRouter.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const received = await Question.find({ userId: userId });
    res.json(received);
  } catch (error) {
    res.json({ Emessage: error });
  }
});

// get questions of a category 
questionRouter.get('/category/:category', async (req, res) => {
  const category = req.params.category;
  try {
    const received = await Question.find({ category: category });
    console.log(received);
    res.json(received);
  } catch (error) {
    res.json({ Emessage: error });
  }
});

// get question
questionRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const received = await Question.findById(id);
    if (!req.query.refresh) {
      received.views++;
    }
    const saved = await Question.findByIdAndUpdate(id, received, { new: true });
    res.json(saved);
  } catch (error) {
    res.json({ Emessage: error });
  }
});

// Vote question
questionRouter.put('/:id/vote', async (req, res) => {
  // console.log(req.body);
  vote = { userId: req.body.userId };

  try {
    const id = req.params.id;
    const received = await Question.findById(id);
    let index = -1;
    let unVote = false;
    for (const voter of received.voters) {
      if (voter.userId == req.body.userId) {
        index = received.voters.indexOf(voter);
        break;
      }
    }
    // console.log(vote);
    if (index == -1) {
      if (req.query.vote == 1) {
        vote.upDown = 1;
        received.votes++;
      } else {
        vote.upDown = 2;
        received.votes--;
      }
    } else if (index >= 0) {
      if (received.voters[index].upDown == 2) {
        if (req.query.vote == 1) { // down to up
          vote.upDown = 1;
          received.votes += 2;
        } else {
          received.votes++;
          vote.upDown = 0;
          unVote = true;
        }
      } else if (received.voters[index].upDown == 1) {
        if (req.query.vote == 0) { // up to down
          vote.upDown = 2;
          received.votes -= 2;
        } else {
          received.votes--;
          vote.upDown = 0;
          unVote = true;
        }
      }
      received.voters.splice(index, 1);
    }
    console.log(vote);
    if (unVote == false) {
      received.voters.push(vote);
    }
    const saved = await Question.findByIdAndUpdate(id, received, { new: true });
    res.json(saved);

  } catch (error) {
    res.json({ Emessage: error });
  }
});

// Edit question
questionRouter.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const question = req.body;
    const saved = await Question.findByIdAndUpdate(id, question, { new: true });
    res.json(saved);
  } catch (error) {
    res.json({ Emessage: error });
  }
});

// Delete question
questionRouter.delete('/:id', async (req, res) => {
  try {
    const removed = await Question.remove({ _id: req.params.id });
    res.json(removed);
  } catch (error) {
    res.json({ message: error });
  }
});

// Add answer
questionRouter.put('/:id/answers', async (req, res) => {
  // console.log(req);
  const answer = {
    body: req.body.body,
    userId: req.body.userId,
    votes: 0,
    createdAt: Date.now()
  };
  try {
    const id = req.params.id;
    const parent = await Question.findById(id);
    parent.answers.push(answer);
    const saved = await parent.save();
    res.json(saved);
  } catch (error) {
    res.json({ Emessage: error });
  }
});

// Delete answer
questionRouter.delete('/:questionId/answers/:answerId', async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const answerId = req.params.answerId;
    const parent = await Question.findById(questionId);
    for (const answer of parent.answers) {
      if (answerId == answer._id) {
        index = parent.answers.indexOf(answer);
        break;
      }
    }
    // console.log(index);
    if (index >= 0) {
      parent.answers.splice(index, 1);
    }
    const saved = await parent.save();
    res.json(saved);
  } catch (error) {
    res.json({ message: error });
  }
});

// edit answer
questionRouter.put('/:questionId/answers/:answerId', async (req, res) => {
  const questionId = req.params.questionId;
  const answerId = req.params.answerId;
  try {
    const received = await Question.findById(questionId);
    for (const answer of received.answers) {
      if (answer._id == answerId) {
        answer.body = req.body.body;
        break;
      }
    };
    const saved = await Question.findByIdAndUpdate(questionId, received, { new: false });
    res.json(saved);
  } catch (error) {
    res.json({ Emessage: error });
  }
});

// Vote answer
questionRouter.put('/:questionId/answers/:answerId/vote', async (req, res) => {
  // console.log(req.body);
  vote = { userId: req.body.userId };
  try {
    const questionId = req.params.questionId;
    const answerId = req.params.answerId;
    const received = await Question.findById(questionId);
    for (const answer of received.answers) {
      if (answer._id == answerId) {
        answerIndex=received.answers.indexOf(answer);
        let index = -1;
        let unVote = false;
        for (const voter of answer.voters) {
          if (voter.userId == req.body.userId) {
            index = answer.voters.indexOf(voter);
            break;
          }
        }
        if (index == -1) {
          if (req.query.vote == 1) {
            vote.upDown = 1;
            answer.votes++;
          } else {
            vote.upDown = 2;
            answer.votes--;
          }
        }
        else if (index >= 0) {
          if (answer.voters[index].upDown == 2) {
            if (req.query.vote == 1) { // down to up
              vote.upDown = 1;
              answer.votes += 2;
            } else {
              answer.votes++;
              vote.upDown = 0;
              unVote = true;
            }
          } else if (answer.voters[index].upDown == 1) {
            if (req.query.vote == 0) { // up to down
              vote.upDown = 2;
              answer.votes -= 2;
            } else {
              answer.votes--;
              vote.upDown = 0;
              unVote = true;
            }
          }
          answer.voters.splice(index, 1);
        }
        console.log(unVote);
        
        if (unVote == false) {
          answer.voters.push(vote);
          received.answers.splice(answerIndex,1);
          // console.log(received);
          received.answers.push(answer);
          console.log(received);
        }
        break;
      }
    };
    console.log(received);
    const saved = await Question.findByIdAndUpdate(questionId, received, { new: false });
    res.json(saved);
  } catch (error) {
    res.json({ Emessage: error });
  }
});

// Add comment to question
questionRouter.put('/:questionId/comments', async (req, res) => {
  console.log('req.body');
  const comment = {
    body: req.body.body,
    userId: req.body.userId,
    createdAt: Date.now()
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
    res.json({ Emessage: error });
  }
});

// Add comment to answer
questionRouter.put('/:questionId/answers/:answerId/comments', async (req, res) => {
  const comment = {
    body: req.body.body,
    userId: req.body.userId,
    createdAt: Date.now()
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
    res.json({ Emessage: error });
  }
});

