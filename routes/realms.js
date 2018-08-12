const express = require('express');
const {
  getByUserId, getByIdAndUserId, create, update,
} = require('../repositories/realm');
const { parseRealm } = require('../factories/realm');

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
    .then((realms) => {
      const returnRealms = [];
      if (realms && realms.length > 0) {
        for (let q = 0; q < realms.length; q += 1) {
          returnRealms.push(parseRealm(realms[q]));
        }
      }
      res.json({
        error: false,
        data: returnRealms,
      });
    })
    .catch(error => res.json({
      error: true,
      data: [],
      errorData: error,
    }));
});

router.get('/:id', (req, res) => {
  const realmId = req.params.id;

  getByIdAndUserId(realmId, req.user.id)
    .then((realm) => {
      if (realm) {
        return res.json({
          error: false,
          data: parseRealm(realm),
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
  const { name, enabled } = req.body;
  const realmId = req.params.id;

  getByIdAndUserId(realmId, req.user.id)
    .then((realm) => {
      if (!realm) {
        return res.status(404).json({
          message: 'Not found',
        });
      }

      return update(realmId, name, enabled)
        .then(updatedRealm => res.status(200).json({
          error: false,
          data: parseRealm(updatedRealm),
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
  } = req.body;
  create(name, req.user.id)
    .then(realm => res.status(201).json({
      error: false,
      data: realm,
      message: 'New realm has been created.',
    }))
    .catch(error => res.json({
      error: true,
      data: [],
      errorData: error,
    }));
});

module.exports = router;
