const model = require('../models/index');

module.exports.getByUserId = function get(userId, limit, offset) {
  return new Promise((resolve, reject) => {
    model.Entity.findAll({
      include: [{
        model: model.Realm,
        where: {
          userId,
        },
        limit,
        offset,
      }],
    })
      .then(resolve)
      .catch(reject);
  });
};

module.exports.getByIdAndUserId = function getByIdAndUserId(entityId, userId) {
  return new Promise((resolve, reject) => {
    model.Entity.find({
      where: {
        id: entityId,
      },
      include: [{
        model: model.Realm,
        where: {
          userId,
        },
      }],
    })
      .then(resolve)
      .catch(reject);
  });
};

module.exports.getByName = function getByIdAndUserId(name, realmId) {
  return new Promise((resolve, reject) => {
    model.Entity.find({
      where: {
        realmId,
        name,
      },
    })
      .then(resolve)
      .catch(reject);
  });
};

module.exports.create = function create(name, friendlyName, realmId) {
  return new Promise((resolve, reject) => {
    model.Entity.create({
      name,
      friendlyName,
      realmId,
    })
      .then(resolve)
      .catch(reject);
  });
};

module.exports.update = function update(entityId, name, friendlyName) {
  return new Promise((resolve, reject) => {
    model.Entity.update({
      name,
      friendlyName,
    }, {
      where: {
        id: entityId,
      },
    })
      .then(() => {
        model.Entity.findById(entityId)
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
};
