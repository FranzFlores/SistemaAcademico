'use strict'
var helpers = require('../lib/helpers');
var Person = require('../models/person.model');
var Account = require('../models/account.model');
var Student = require('../models/student.model');
var Teacher = require('../models/teacher.model');


module.exports = function (passport) {
    var LocalStrategy = require('passport-local').Strategy;


    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        Person.findById(user.person, (err, person) => {
            if (err) console.log(err);
            else {
                if (person) {
                    var personInfo = {
                        idPerson: person._id,
                        idAccount: user.id,
                        user_name: user.user_name,
                        role: person.role
                    }
                    done(null, personInfo);
                }else {
                done(null, false);
            }
        }
        });
});


//Inicio Sesion
passport.use('local-singin', new LocalStrategy({
    usernameField: 'user_name',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {

    Account.findOne({ user_name: req.body.user_name }, (err, account) => {
        if (err) {
            console.log(err);
            return done(null, false);
        } else {
            if (!account) {
                return done(null, false);
            } else if (helpers.matchPassword(req.body.password, account.password)) {
                return done(null, account);
            }
            else {
                return done(null, false);
            }
        }
    });
}));
}
