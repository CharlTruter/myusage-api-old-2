const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { getByUsername, get, validatePassword } = require('../repositories/user');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  (username, password, cb) => getByUsername(username)
    .then((user) => {
      if (!user) {
        return cb(null, false, { message: 'Unknown username' });
      }

      if (validatePassword(user, password) !== true) {
        return cb(null, false, { message: 'Incorrect password' });
      }

      return cb(null, user, { message: 'Logged In Successfully' });
    })
    .catch(err => cb(err)),
));

passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'some_jwt_secret',
  },
  (jwtPayload, cb) => get(jwtPayload.id)
    .then((user) => {
      if (user.password === jwtPayload.password) {
        return cb(null, user);
      }

      return cb(null, false, { message: 'Password has been changed' });
    })
    .catch(err => cb(err)),
));
