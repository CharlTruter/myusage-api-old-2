const model = require('../models/index');

module.exports.create = function create(bytesDownloaded, bytesUploaded, usageDate, realmId,
  entityId, userId) {
  return new Promise((resolve, reject) => {
    model.EntityUsage.create({
      bytesDownloaded,
      bytesUploaded,
      usageDate,
      realmId,
      entityId,
      userId,
    })
      .then(resolve)
      .catch(reject);
  });
};
