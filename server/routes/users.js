const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { returnToken } = require('../utilities/jwt-helper');

const User = require('../models/User');

/**
 * Handles creating a new user in the database with an existance verification step.
 * @param {Object} res - Response object to return
 * @param {string} name - Name of a user
 * @param {string} email - Email of a user
 * @param {string} password - Password of a user that will be hashed
 * @param {Object} user - A search object to verify that the user does not already exist in the database
 */
function handleCreateUser(res, name, email, password, user) {
  if (user) {
    return res.status(400).json('User already exists');
  } else {
    const newUser = new User({ name, email, password });
    newUser.save().then(user => handleUserSave(res, user));
  }
}

/**
 * Handles saving a new user to the database.
 * @param {Object} res - Response object to return
 * @param {Object} user - User object to with login credentails
 */
function handleUserSave(res, user) {
  returnToken({ id: user.id }).then(token =>
    handleReturnToken(res, user, token)
  );
}

/**
 * Handles returning a token to an authenticated user
 * @param {Object} res - Response object to return
 * @param {Object} user - User object to with login credentails
 * @param {Object} token - A token for verification
 */
function handleReturnToken(res, user, token) {
  return res.status(200).json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
    msg: 'User registered successfully'
  });
}

/**
 * Register new user
 * @route   POST api/users
 * @auth    Public
 */
router.post(
  '/',
  [
    body('name')
      .trim()
      .escape()
      .notEmpty(),
    body('email')
      .trim()
      .notEmpty()
      .isEmail()
      .normalizeEmail(),
    body('password').notEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json('Invalid input data');
    }

    // Destructure required data from request body
    const { name, email, password } = req.body;

    User.findOne({ email }).then(user =>
      handleCreateUser(res, name, email, password, user)
    );
  }
);

module.exports = router;
