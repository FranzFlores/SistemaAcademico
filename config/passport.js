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

    passport.deserializeUser((id, done) => {
        Account.findById(id, (err, account) => {
            if (err) console.log(err);
            else {
                if (account) {
                    account.populate({ path: 'person' }).exec((err, person) => {
                        if (err) console.log(err);
                        else {
                            var personInfo = {
                                idPerson: person._id,
                                idAccount: account.id,
                                user_name: account.user_name,
                                role: person.role
                            }
                            done(null, personInfo);
                        }
                    })
                } else {
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
        Account.findOne({ user_name: email })
            .then((account) => {
                if (!account) {
                    req.flash('OK', 'Correo o Contraseña Invalidos','/login');
                }
                if (helpers.matchPassword(password, account.password)) {
                    done(null, account, req.flash('GOOD', 'Bienvenido de nuevo al sistema'));
                }
                else {
                   req.flash('OK', 'Contraseña Incorrecta','/login');
                }
            }).catch(function (err) {
                console.log("Error:", err);
                req.flash('BAD', 'Ha ocurrido un error','/login');
            });
    }));
}
