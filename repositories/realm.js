const model = require('../models/index');

module.exports.getByUserId = function getByUserId(userId, limit, offset) {
  return new Promise((resolve, reject) => {
    model.Realm.findAll({
      where: {
        userId,
      },
      limit,
      offset,
    })
      .then(resolve)
      .catch(reject);
  });
};

module.exports.getByIdAndUserId = function getByIdAndUserId(realmId, userId) {
  return new Promise((resolve, reject) => {
    model.Realm.find({
      where: {
        id: realmId,
        userId,
      },
    })
      .then(resolve)
      .catch(reject);
  });
};

module.exports.create = function create(name, userId) {
  return new Promise((resolve, reject) => {
    model.Realm.create({
      name,
      userId,
      enabled: true,
    })
      .then(resolve)
      .catch(reject);
  });
};

module.exports.update = function update(realmId, name, enabled) {
  return new Promise((resolve, reject) => {
    model.Realm.update({
      name,
      enabled,
    }, {
      where: {
        id: realmId,
      },
    })
      .then(() => {
        model.Realm.findById(realmId)
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
};
