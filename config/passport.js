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
                    done(account.errors, null);
                }
            }
        });
    });

    //Registro de Persona
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'personal_mail',
        passwordField: 'dni_person',
        passReqToCallback: true
    }, function (req, email, password, done) {

        //Registro de Persona
        Person.findOne({ dni_person: req.body.dni_person }, (err, personResult) => {
            if (err) console.log(err);
            else if (personResult) return done(null, false, req.flash('message', 'El usuario ya existe'));
            else {
                new Person({
                    dni_person: req.body.dni_person,
                    name: req.body.name,
                    birthday: req.body.birthday,
                    institutional_mail: req.body.institutional_mail,
                    personal_mail: req.body.personal_mail,
                    address: req.body.address,
                    phone: req.body.phone,
                    image: "null",
                    role: req.body.role
                }).save((err, newPerson) => {
                    if (err) console.log("Error al crear persona " + err);
                    else if (newPerson) {
                        new Account({
                            user_name: req.body.institutional_mail,
                            password: helpers.generateHash(newPerson.dni_person),
                            person: newPerson._id
                        }).save((err, newAccount) => {
                            if (err) console.log('Error al crear cuenta' + err);
                            else if (newAccount) {
                                if (req.body.role === 'student') {
                                    new Student({
                                        school: req.body.school,
                                        graduation_grade: req.body.graduation_grade,
                                        person: newPerson._id
                                    }).save((err, newStudent) => {
                                        if (err) console.log('Error al crear estudiante' + err);
                                        else if (newStudent) {
                                            done(null, newPerson, req.flash('success', 'Se ha realizado el registro con exito'));
                                        } else console.log('No se pudo crear el usuario');
                                    })
                                } else if (req.body.role == 'teacher') {
                                    new Teacher({
                                        university_degree: req.body.university_degree,
                                        fourth_level_degree: req.body.fourth_level_degree,
                                        timetable: req.body.timetable,
                                        person: newPerson._id
                                    }).save((err, newTeacher) => {
                                        if (err) console.log('Error al crear maestro' + err);
                                        else if (newTeacher) {
                                            done(null, newPerson, req.flash('success', 'Se ha realizado el registro con exito'));
                                        } else console.log('No se pudo crear el usuario');
                                    })
                                }
                            } else console.log('No se pudo crear el usuario');
                        })
                    } else console.log('No se pudo crear el usuario');
                })
            }
        })
    }));

    //Inicio Sesion
    passport.use('local-singin', new LocalStrategy({
        usernameField: 'user_name',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        Account.findOne({ user_name: user_name })
            .then((account) => {
                if (!account) {
                    return done(null, false, req.flash('message', 'Correo o Contraseña Invalidos'));
                }
                if (helpers.matchPassword(password, account.password)) {
                    done(null, user, req.flash('success', 'Bienvenido de nuevo al sistema'));
                }
                else {
                   return  done(null, false, req.flash('message', 'Contraseña Incorrecta'));
                }
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, req.flash('message', 'Ha ocurrido un error'));
            });
    }));
}
