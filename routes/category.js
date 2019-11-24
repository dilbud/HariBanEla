const Category = require('../models/category');
const express = require('express');
const router = express.Router();
const winston = require('../config/winston');



/* GET ALL CATEGORIES */

router.get('/', async function(req, res, next) {
  try {
    const categories = await Category.find();
    winston.info(`200 -  View a categories. - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.json(categories);

  } catch (error) {
    winston.error(`${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return next(error);
    throw error; // <-- THIS IS ESSENTIAL FOR BREAKING THE CHAIN
  }
});


// GET SINGEL CATEGORY BY ID
router.get('/:id', async function(req, res, next) {
  try {
    const category = await Category.findById(req.params.id);
    winston.info(`200 -  View a category. - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.json(category);
  } catch (error) {
    winston.error(`${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return next(error);
    throw error; // <-- THIS IS ESSENTIAL FOR BREAKING THE CHAIN
  }
});

//   CREATE NEW CATEGORY
router.post('/', async function(req, res, next) {
  try {
    const category = await Category.create(req.body);
    winston.info(`200 - created a new category. - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.json(category);
  } catch (error) {
    winston.error(`${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return next(error);
    throw error; // <-- THIS IS ESSENTIAL FOR BREAKING THE CHAIN
  }
});

// UPDATE CATEGORY BY ID
router.put('/:id', async function(req, res, next) {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});
    winston.info(`200 - category updated. - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.json(category);
  } catch (error) {
    winston.error(`${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return next(error);
    throw error; // <-- THIS IS ESSENTIAL FOR BREAKING THE CHAIN
  }
});

//   DELETE CATEGORY BY ID
router.delete('/:id', async function(req, res, next) {
  try {
    const category = await Category.findByIdAndRemove(req.params.id, req.body);
    winston.info(`200 - Deleted the category sucessful - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.json(category);
  } catch (error) {
    winston.error(`${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return next(error);
    throw error; // <-- THIS IS ESSENTIAL FOR BREAKING THE CHAIN
  }
});


module.exports = router;
