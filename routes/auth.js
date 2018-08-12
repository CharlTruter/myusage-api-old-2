const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { parseUser, parseJwtUser } = require('../factories/user');

const router = express.Router();

router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: true,
        message: 'Unauthorized',
      });
    }

    return req.login(user, { session: false }, (loginErr) => {
      if (loginErr) {
        return res.status(401).json({
          error: true,
          message: 'Unauthorized',
        });
      }

      const jwtParsedUser = parseJwtUser(user);
      const parsedUser = parseUser(user);

      const token = jwt.sign(jwtParsedUser, 'some_jwt_secret');
      return res.json({ parsedUser, token });
    });
  })(req, res);
});

module.exports = router;
