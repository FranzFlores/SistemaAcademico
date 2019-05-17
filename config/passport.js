'use strict'
var helpers = require('../lib/helpers');
var Person = require('../models/person.model');
var Account = require('../models/account.model');
var Student = require('../models/student.model');
var Teacher = require('../models/teacher.model');


module.exports = function (passport) {
    var LocalStrategy = require('passport-local').Strategy;


    passport.serializeUser((user, done) => {
        done(null, user.id);
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
        usernameField: 'user_name',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        //Validaciones 

        //validar que el correo institucional
        var email = (req.body.institutional_mail).split('\@');
        if (email[1] == "unl.edu.ec") {
            return done(null, false, req.flash('message', 'El Correo Institucional es Incorrecto'));
        }

        //validar los campos que unicamente contienen letras
        var RegExPattern = /[a-zA-Z ]/;
        if ((!(req.body.name).match(RegExPattern))) {
            return done(null, false, req.flash('message', 'El nombre unicamente debe contener letras'));
        }

        //validar los campos que unicamente contienen numeros
        RegExPattern = /[0-9]/;
        if ((!(req.body.dni_person).match(RegExPattern)) || (!(req.body.phone).match(RegExPattern))) {
            return done(null, false, req.flash('message', 'El campo es numero'));
        }

        //validacion de la cedula 
        var cad = req.body.dni_person;
        var total = 0;
        var longitud = cad.length;
        var longcheck = longitud - 1;

        if (cad !== "" && longitud === 10) {
            for (i = 0; i < longcheck; i++) {
                if (i % 2 === 0) {
                    var aux = cad.charAt(i) * 2;
                    if (aux > 9) aux -= 9;
                    total += aux;
                } else {
                    total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
                }
            }
            total = total % 10 ? 10 - total % 10 : 0;
            if (cad.charAt(longitud - 1) != total) {
                return done(null, false, req.flash('message', 'El campo es numero'));
            }
        }

        //validar que la fecha tenga el formato yyyy-mm-dd
        RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
        if (!(req.body.birthday).match(RegExPattern)) {
            return done(null, false, req.flash('message', 'El formato de Fecha es incorrecto'));
        }

        var test_birthday_user = new Date();
        var date = (req.body.birthday).split("-");
        test_birthday_user.setFullYear(date[0], date[1] - 1, date[2]);
        var today = new Date();
        var day = date[2];
        var month = date[1];
        var year = date[0];
        var date1 = new Date(year, month, '0');
        //fecha valida
        if ((day - 0) > (date1.getDate() - 0)) {
            return done(null, false, req.flash('message', 'La fecha ingresada es incorrecta'));
        }
        //fecha ingresada es mayor a la actual
        var dateNew = today.setFullYear(today.getFullYear() - 5);
        if (test_birthday_user > dateNew) {
            return done(null, false, req.flash('message', 'La fecha ingresada es incorrecta'));
        }

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
                            user: req.body.institutional_mail,
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
                                            var aux = {};
                                            aux.person = newPerson;
                                            aux.account = newAccount;
                                            aux.student = newStudent;
                                            done(null, aux, req.flash('success', 'Se ha realizado el registro con exito'));
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
                                            var aux = {};
                                            aux.person = newPerson;
                                            aux.account = newAccount;
                                            aux.teacher = newTeacher;
                                            done(null, aux, req.flash('success', 'Se ha realizado el registro con exito'));
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
                    done(null, false, req.flash('message', 'Contraseña Incorrecta'));
                }
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, req.flash('message', 'Ha ocurrido un error'));
            });
    }));
}