const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { returnToken } = require('../utilities/jwt-helper');

const auth = require('../utilities/authMiddleware');
const User = require('../models/User');

function handlePasswordVerify(res, user, result) {
  if (!result) {
    return res.status(400).json('Invalid credentials');
  } else {
    returnToken({ id: user.id }).then(token =>
      handleAuthorize(res, user, token)
    );
  }
}

function handleAuthorize(res, user, token) {
  if (!token) {
    return res.status(400).json('Token failed to generate');
  } else {
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  }
}

/**
 * Authenticate user login
 * @route   POST api/auth
 * @auth    Public
 */
router.post(
  '/',
  [
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
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    User.findOne({ email }, function handleLoginAttempt(err, user) {
      if (!user) {
        return res.status(400).json('User not found');
      } else {
        user
          .verifyPassword(password)
          .then(result => handlePasswordVerify(res, user, result));
      }
    });
  }
);

/**
 * Ensure token is valid
 * @route   GET api/auth/user
 * @auth    Private
 */
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(err => {
      return res.status(400).json(err);
    });
});

module.exports = router;
