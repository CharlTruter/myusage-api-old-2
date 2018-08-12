const crypto = require('crypto');

module.exports.generateRandomString = function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

module.exports.encryptString = function encryptString(value, salt) {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(value);
  return hash.digest('hex');
};
