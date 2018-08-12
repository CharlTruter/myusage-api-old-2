const express = require('express');
const { update, updatePassword, get } = require('../repositories/user');
const { parseUser } = require('../factories/user');

const router = express.Router();

router.get('/', (req, res) => {
  get(req.user.id)
    .then(user => res.json({
      error: false,
      data: user,
    }))
    .catch(error => res.json({
      error: true,
      data: [],
      errorData: error,
    }));
});

router.put('/', (req, res) => {
  const { enabled } = req.body;

  update(req.user.id, enabled)
    .then(user => res.status(200).json({
      error: false,
      data: parseUser(user),
      message: 'User has been updated.',
    }))
    .catch(error => res.json({
      error: true,
      errorData: error,
    }));
});

router.put('/password', (req, res) => {
  const { password } = req.body;

  updatePassword(req.user.id, password)
    .then(() => res.status(200).json({
      error: false,
      message: 'User password has been updated.',
    }))
    .catch(error => res.json({
      error: true,
      errorData: error,
    }));
});

module.exports = router;
