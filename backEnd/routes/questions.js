var express = require('express');
var Question = require('../models/question');

var router = express.Router();

// Create question
router.post('/', async (req, res) => {
    const question = new Question({
        title: req.body.title,
        category: req.body.category,
        body: req.body.body,
        answerCount: 0,
        answers: [],
        tags: req.body.tags,
        views: 0,
        votes: 0,
    });

    try {
        const saved = await question.save();
        res.json(saved);
    } catch (error) {
        res.json({ Emessage: error });
    }
});

// View questions
router.get('/', async (req, res) => {
    try {
        const received = await Question.find();
        res.json(received);
    } catch (error) {
        res.json({ Emessage: error });
    }
});

// View question
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const received = await Question.findById(id);
        received.views++;
        const saved = await Question.findByIdAndUpdate(id, received,{new:true});
        res.json(saved);
    } catch (error) {
        res.json({ Emessage: error });
    }
});

// Edit question
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const question = req.body;
        const saved = await Question.findByIdAndUpdate(id, question,{new:true});
        res.json(saved);
    } catch (error) {
        res.json({ Emessage: error });
    }
});

// Delete question
router.delete('/:id', async (req, res) => {
    try{
        const removed = await Question.remove({_id: req.params.id})
        res.json(removed);
    } catch(error) {
        res.json({message: error});
    }
});

// Add answer
router.put('/:id/answers', async (req, res) => {
    const answer = {
        body: req.body.body,
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

module.exports = router;
