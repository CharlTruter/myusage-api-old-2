const express = require('express');
const {
  getByUserId, getByIdAndUserId, create, update,
} = require('../repositories/entity');
const getRealmByIdAndUserId = require('../repositories/realm').getByIdAndUserId;
const { parseEntity } = require('../factories/entity');

const router = express.Router();

router.get('/', (req, res) => {
  let limit = 25;
  let offset = 0;

  if (req.query.limit !== undefined && req.query.limit !== null) {
    limit = parseInt(req.query.limit, 10);
  }

  if (req.query.offset !== undefined && req.query.offset !== null) {
    offset = parseInt(req.query.offset, 10);
  }

  getByUserId(req.user.id, limit, offset)
    .then((entities) => {
      const returnEntities = [];
      if (entities && entities.length > 0) {
        for (let q = 0; q < entities.length; q += 1) {
          returnEntities.push(parseEntity(entities[q]));
        }
      }
      res.json({
        error: false,
        data: returnEntities,
      });
    })
    .catch(error => res.json({
      error: true,
      data: [],
      errorData: error,
    }));
});

router.get('/:id', (req, res) => {
  const entityId = req.params.id;

  getByIdAndUserId(entityId, req.user.id)
    .then((entity) => {
      if (entity) {
        return res.json({
          error: false,
          data: parseEntity(entity),
        });
      }

      return res.status(404).json({
        message: 'Not found',
      });
    })
    .catch(error => res.json({
      error: true,
      data: [],
      errorData: error,
    }));
});

router.put('/:id', (req, res) => {
  const { name, friendlyName } = req.body;
  const entityId = req.params.id;

  getByIdAndUserId(entityId, req.user.id)
    .then((entity) => {
      if (!entity) {
        return res.status(404).json({
          message: 'Not found',
        });
      }

      return update(entityId, name, friendlyName)
        .then(updatedEntity => res.status(200).json({
          error: false,
          data: parseEntity(updatedEntity),
          message: 'Realm has been updated.',
        }))
        .catch(error => res.json({
          error: true,
          errorData: error,
        }));
    });
});

router.post('/', (req, res) => {
  const {
    name,
    friendlyName,
    realmId,
  } = req.body;

  getRealmByIdAndUserId(realmId, req.user.id)
    .then((realm) => {
      if (!realm) {
        return res.status(400).json({
          message: 'Realm does not exist',
        });
      }

      return create(name, friendlyName, realmId)
        .then(entity => res.status(201).json({
          error: false,
          data: parseEntity(entity),
          message: 'New entity has been created.',
        }))
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
