const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * A helper function that generates the salt for hashing.
 * @param {number} rounds - The number of rounds to generate salt.
 */
const genSalt = rounds =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(rounds, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

/**
 * A helper funtion that hashes a user password.
 * @param {string} data - The user password that was input.
 */
const hashHelper = data =>
  new Promise(async (resolve, reject) => {
    const salt = await genSalt(saltRounds);

    bcrypt.hash(data, salt, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });

/**
 * A helper function that compares an input value to the true hashed value.
 * @param {string} dataToCompare - Input data that needs to be compared.
 * @param {string} encryptedHash - The true value to compare with.
 */
const compareHelper = (dataToCompare, encryptedHash) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(dataToCompare, encryptedHash, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

module.exports = { hashHelper, compareHelper };
