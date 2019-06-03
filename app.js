'use strict'
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const passport = require('passport');
var flash = require('express-flash-notification');

//Inicializaciones
var app = express();
const { mongoose } = require('./database');
require("./config/passport")(passport);

//Configuraciones
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const flashOptions = {
  beforeSingleRender: function(item, callback){
    if (item.type) {
      switch(item.type) {
        case 'GOOD':
          item.type = 'Hecho';
          item.alertClass = 'alert-success';
          break;
        case 'OK':
          item.type = 'Info';
          item.alertClass = 'alert-info';
          break;
        case 'BAD':
          item.type = 'Error';
          item.alertClass = 'alert-danger';
          break;
      }
    }
    callback(null, item);
  }
};


//Middlewares

app.use(logger('dev'));
app.use(express.json());
app.use(session({
  secret:'sistemaAcademico',
  resave: true,
  saveUninitialized: false
}));

app.use(flash(app, flashOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());


//Variables Globales
app.use((req, res, next) => {
  app.locals.user = req.user;
  next();
});

//rutas
app.use(require('./routes/index'));
app.use('/person',require('./routes/person'));
app.use('/faculty',require('./routes/faculty.route'));
app.use('/career',require('./routes/career.route'));
app.use('/curriculum',require('./routes/curriculum.route'));
app.use('/subject',require('./routes/subject.route'));
app.use('/subject-period',require('./routes/subject_period.route'));
app.use('/subject-teacher',require('./routes/subject_teacher.route'));
app.use('/period',require('./routes/period.route'));
app.use('/unity',require('./routes/unity.route'));
app.use('/class',require('./routes/class.route'));

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
