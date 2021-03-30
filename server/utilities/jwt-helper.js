if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

/**
 * A helper function that returns a token for authentication.
 * @param {string} payload - The input data to verify.
 * @param {string} secret - The secret key of this application.
 * @param {Object} options - Option object to be passed to the JWT.sign function
 */
const returnToken = (
  payload,
  secret = jwtSecret,
  options = { expiresIn: 3600 }
) =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });

/**
 * A helper function to verify if a token is valid.
 * @param {string} inputToken - The token to be verified.
 * @param {string} secret - The secret key of this application.
 */
const verifyToken = (inputToken, secret = jwtSecret) =>
  new Promise((resolve, reject) => {
    jwt.verify(inputToken, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });

module.exports = { returnToken, verifyToken };
