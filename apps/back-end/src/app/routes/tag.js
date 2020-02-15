const express = require('express');
const tag = require('../controller/tag');

export const tagRouter = express.Router();

tagRouter.post('/create', tag.create);
tagRouter.post('/update', tag.update);
tagRouter.get('/getalltag', tag.get);
