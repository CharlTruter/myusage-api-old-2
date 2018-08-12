const { generateRandomString, encryptString } = require('./utils');
const model = require('../models/index');

module.exports.getByUsername = function getByUsername(username) {
  return new Promise((resolve, reject) => {
    model.User.findAll({
      where: {
        username,
      },
    })
      .then((users) => {
        if (users && users.length > 0) {
          return resolve(users[0]);
        }

        return resolve();
      })
      .catch(reject);
  });
};

module.exports.get = function get(userId) {
  return new Promise((resolve, reject) => {
    model.User.findById(userId)
      .then(resolve)
      .catch(reject);
  });
};

module.exports.create = function create(username, password) {
  return new Promise((resolve, reject) => {
    const salt = generateRandomString(10);

    const hashedPassword = encryptString(password, salt);

    model.User.create({
      username,
      password: hashedPassword,
      enabled: true,
      salt,
    })
      .then(resolve)
      .catch(reject);
  });
};

module.exports.update = function update(userId, enabled) {
  return new Promise((resolve, reject) => {
    model.User.update({
      enabled,
    }, {
      where: {
        id: userId,
      },
    })
      .then(() => {
        model.User.findById(userId)
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
};

module.exports.updatePassword = function updatePassword(userId, password) {
  return new Promise((resolve, reject) => {
    const salt = generateRandomString(10);

    const hashedPassword = encryptString(password, salt);

    model.User.update({
      password: hashedPassword,
      salt,
    }, {
      where: {
        id: userId,
      },
    })
      .then(resolve)
      .catch(reject);
  });
};

module.exports.validatePassword = function validatePassword(user, password) {
  const hashedPassword = encryptString(password, user.salt);

  return hashedPassword === user.password;
};
