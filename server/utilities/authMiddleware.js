const { verifyToken } = require('./jwt-helper');

/**
 * Authenticates a user with a proper token sent in the request header.
 * @param {Object} req - The request sent by the client.
 * @param {Object} res - The response to send to the client from the server.
 * @param {function} next - The standard middleware next function that signals the end of this function.
 */
function auth(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json('Not authorized');
  } else {
    verifyToken(token)
      .then(result => {
        req.user = result;
        next();
      })
      .catch(err => {
        return res.status(401).json('Invalid token');
      });
  }
}

module.exports = auth;
