const express = require('express');
const { create } = require('../repositories/user');

const router = express.Router();

router.post('/', (req, res) => {
  const {
    username,
    password,
  } = req.body;
  create(username, password)
    .then(user => res.status(201).json({
      error: false,
      data: user,
      message: 'New user has been created.',
    }))
    .catch(error => res.json({
      error: true,
      data: [],
      errorData: error,
    }));
});

module.exports = router;
