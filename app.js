'use strict'
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const engine = require('ejs-mate');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const passport = require('passport');
var flash = require('connect-flash');

//Inicializaciones
var app = express();
const { mongoose } = require('./database');
require("./config/passport")(passport);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs',engine);
app.set('view engine', 'ejs');


//Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(session({
  secret:'sistemaAcademico',
  resave: true,
  saveUninitialized: false
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


//Variables Globales
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  //app.locals.account = req.isAuthenticated();
  next();
});

//rutas
app.use(require('./routes/index'));
app.use('/person',require('./routes/person'));
app.use('/career',require('./routes/career.route'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
