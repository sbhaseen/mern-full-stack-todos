const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const auth = require('../utilities/authMiddleware');
const Item = require('../models/Item');

const paginatedResults = require('../utilities/paginationMiddleware');

/**
 * Get all Items
 * @route   GET api/items
 * @auth  Public
 */
router.get('/', paginatedResults(Item), (req, res) => {
  res.json(res.paginatedResults);
});

/**
 * Get one item by ID
 * @route   GET api/items/:id
 * @auth    Public
 */
router.get('/:id', (req, res) => {
  Item.findById(req.params.id, (err, items) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).json(items);
    }
  });
});

/**
 * Create an item
 * @route   POST api/items
 * @auth    Private
 */
router.post(
  '/',
  auth,
  [
    body('description')
      .trim()
      .escape()
      .notEmpty(),
    body('responsible')
      .trim()
      .escape(),
    body('priority')
      .trim()
      .escape()
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json('Invalid input data');
    }

    const newItem = new Item(req.body);
    newItem.save().then(item => res.status(200).json(item));
  }
);

/**
 * Update an item
 * @route   UPDATE api/items/:id
 * @auth    Private
 */
router.put(
  '/:id',
  auth,
  [
    body('description')
      .trim()
      .escape()
      .notEmpty(),
    body('responsible')
      .trim()
      .escape(),
    body('priority')
      .trim()
      .escape(),
    body('completed')
      .trim()
      .escape()
      .isBoolean()
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json('Invalid input data');
    }

    Item.findByIdAndUpdate(
      req.params.id,
      {
        description: req.body.description,
        responsible: req.body.responsible,
        priority: req.body.priority,
        completed: req.body.completed
      },
      { new: true },
      (err, item) => {
        if (err) {
          return res.status(400).json(err);
        } else {
          return res.status(200).json(item);
        }
      }
    );
  }
);

/**
 * Delete an item
 * @route   DELETE api/items/delete/:id
 * @auth  Private
 */
router.delete('/delete/:id', auth, (req, res) => {
  Item.findByIdAndDelete(req.params.id, (err, item) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).json('Item removed');
    }
  });
});

module.exports = router;
