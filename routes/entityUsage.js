const express = require('express');
const { create } = require('../repositories/entityUsage');
const getRealmByIdAndUserId = require('../repositories/realm').getByIdAndUserId;
const entityRepository = require('../repositories/entity');
const { parseEntityUsage } = require('../factories/entityUsage');

const router = express.Router();

function checkEntity(realmId, entityName) {
  return new Promise((resolve, reject) => {
    entityRepository.getByName(entityName, realmId)
      .then((entity) => {
        if (!entity) {
          return entityRepository.create(entityName, null, realmId)
            .then(resolve)
            .catch(reject);
        }

        return resolve(entity);
      })
      .catch(reject);
  });
}

router.post('/', (req, res) => {
  const {
    bytesDownloaded,
    bytesUploaded,
    usageDate,
    realmId,
    entityName,
  } = req.body;

  getRealmByIdAndUserId(realmId, req.user.id)
    .then((realm) => {
      if (!realm) {
        return res.status(400).json({
          message: 'Realm does not exist',
        });
      }

      return checkEntity(realmId, entityName)
        .then(entity => create(bytesDownloaded, bytesUploaded, usageDate, realmId, entity.id,
          req.user.id)
          .then(entityUsage => res.status(201).json({
            error: false,
            data: parseEntityUsage(entityUsage),
            message: 'New entity usage has been created.',
          }))
          .catch(error => res.json({
            error: true,
            data: [],
            errorData: error,
          })))
        .catch(error => res.json({
          error: true,
          data: [],
          errorData: error,
        }));
    })
    .catch(error => res.json({
      error: true,
      data: [],
      errorData: error,
    }));
});

module.exports = router;
