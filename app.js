const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const userCreateRouter = require('./routes/userCreate');
const realmRouter = require('./routes/realms');
const entityRouter = require('./routes/entity');
const entityUsageRouter = require('./routes/entityUsage');
const authRouter = require('./routes/auth');
const statusRouter = require('./routes/status');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./config/passport');

app.use('/', indexRouter);
app.use('/user', userCreateRouter);
app.use('/user', passport.authenticate('jwt', { session: false }), usersRouter);
app.use('/realm', passport.authenticate('jwt', { session: false }), realmRouter);
app.use('/entity', passport.authenticate('jwt', { session: false }), entityRouter);
app.use('/entity/usage', passport.authenticate('jwt', { session: false }), entityUsageRouter);
app.use('/auth', authRouter);
app.use('/status', statusRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
