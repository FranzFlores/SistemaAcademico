'use strict'
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var ObjectId = require('mongoose').Types.ObjectId;
var fs = require('fs');
var path = require('path');


var Person = require('../models/person.model');
var Student = require('../models/student.model');
var Teacher = require('../models/teacher.model');
var Account = require("../models/account.model");
var SubjectTeacher = require('../models/subject_teacher.model');
var helpers = require("../lib/helpers");

const PersonController = {};

//Cargar Vistas 
PersonController.load_register_teacher = (req, res) => {
    var teachers = Teacher.find({ status: true });
    teachers.populate({ path: 'person', populate: { path: 'career', model: 'Career' } }).exec((err, teachers) => {
        if (err) res.status(500).send("Error en el servidor");
        else {
            res.render('adminProfile/teacher', { title: "Registro de Docente", teachers: teachers });
        }
    });

};

PersonController.load_register_student = (req, res) => {
    var students = Student.find({ status: true });
    students.populate({ path: 'person'}).populate({path:'career'}).exec((err, students) => {
        if (err) res.status(500).send("Error en el servidor");
        else {
            console.log(students);
            res.render('adminProfile/student', { title: "Registro de Estudiante", students: students });
        }
    });

};

PersonController.load_profile = (req, res) => {
    console.log(req.user);
    if (req.user) {
        if (req.user.role == 'student') {
            Student.findOne({ person: req.user.idPerson }, (err, student) => {
                if (err) console.log(err);
                else res.render('profile/profile', { title: "Mi perfil", student: student });
            });
        } else if (req.user.role == 'teacher') {
            Teacher.findOne({ person: req.user.idPerson }, (err, teacher) => {
                if (err) console.log(err);
                else res.render('profile/profile', { title: "Mi perfil", teacher: teacher });
            });
        } else {
            res.render('profile/profile', { title: "Mi perfil" });
        }
    }
};

PersonController.load_update_profile_view = (req, res) => {
    res.render('profile/updateProfile', { title: "Actualizar Perfil" });
};

PersonController.load_update_image_view = (req, res) => {
    res.render('profile/updatePhoto', { title: "Actualizar Foto de Perfil" });
};



//Registro de Personas
PersonController.savePerson = (req, res) => {
    var dni_person = req.body.dni_person;
    var phone = req.body.phone;
    var cad = req.body.dni_person;

    //validar los campos que unicamente contienen numeros
    var RegExPattern = /[0-9]/;
    //valida que la cédula sea correcta
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;
    //Validacion de correo institucional
    var email = (req.body.institutional_mail).split('\@');
    //validar los campos que unicamente contienen letras
    var RegExPattern1 = /[a-zA-Z ]/;

    if ((!cad.match(RegExPattern)) || (!phone.match(RegExPattern))) {
        if (req.user.role == "student") {
            req.flash('OK', 'Los campos cédula o teléfono unicamente deben contener numeros', '/person/student');
        } else if (req.user.role == "teacher") {
            req.flash('OK', 'Los campos cédula o teléfono unicamente deben contener numeros', '/person/student');
        }
    } else if (cad !== "" && longitud === 10) {
        for (var i = 0; i < longcheck; i++) {
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
            if (req.user.role == "student") {
                req.flash('BAD', 'El número de cédula es incorrecto', '/person/student');
            } else if (req.user.role == "teacher") {
                req.flash('BAD', 'El número de cédula es incorrecto', '/person/teacher');
            }
        } else if (!email[1] == "unl.edu.ec") {
            if (req.user.role == "student") {
                req.flash('OK', 'El Correo Institucional es Incorrecto', '/person/student');
            } else if (req.user.role == "teacher") {
                req.flash('OK', 'El Correo Institucional es Incorrecto', '/person/teacher');
            }
        } else if ((!(req.body.name).match(RegExPattern1))) {
            if (req.user.role == "student") {
                req.flash('OK', 'El nombre unicamente debe contener letras', '/person/student');
            } else if (req.user.role == "teacher") {
                req.flash('OK', 'El nombre unicamente debe contener letras', '/person/teacher');
            }
        } else {
            var birthday = (req.body.birthday).split('\/');
            var year = birthday[0];
            var month = birthday[1];
            var day = birthday[2];
            var birthday_user = new Date(year, month, day);

            Person.findOne({ dni_person: req.body.dni_person }, (err, personResult) => {
                if (err) {
                    if (req.user.role == "student") {
                        req.flash('BAD', 'Ha ocurrido un error.', '/person/student');
                    } else if (req.user.role == "teacher") {
                        req.flash('BAD', 'Ha ocurrido un error.', '/person/teacher');
                    }
                } else if (personResult) {
                    if (req.user.role == "student") {
                        req.flash('OK', 'El usuario ya existe', '/person/student');
                    } else if (req.user.role == "teacher") {
                        req.flash('OK', 'El usuario ya existe', '/person/teacher');
                    }
                } else {
                    new Person({
                        dni_person: req.body.dni_person,
                        name: req.body.name,
                        birthday: birthday_user,
                        institutional_mail: req.body.institutional_mail,
                        personal_mail: req.body.personal_mail,
                        address: req.body.address,
                        phone: req.body.phone,
                        image: "null",
                        role: req.body.role
                    }).save((err, newPerson) => {
                        if (err) {
                            if (req.user.role == "student") {
                                req.flash('BAD', 'Ha ocurrido un error.', '/person/student');
                            } else if (req.user.role == "teacher") {
                                req.flash('BAD', 'Ha ocurrido un error.', '/person/teacher');
                            }
                        } else if (newPerson) {
                            new Account({
                                user_name: req.body.institutional_mail,
                                password: helpers.generateHash(newPerson.dni_person),
                                person: newPerson._id
                            }).save((err, newAccount) => {
                                if (err) {
                                    if (req.user.role == "student") {
                                        req.flash('BAD', 'Ha ocurrido un error.', '/person/student');
                                    } else if (req.user.role == "teacher") {
                                        req.flash('BAD', 'Ha ocurrido un error.', '/person/teacher');
                                    }
                                } else if (newAccount) {
                                    if (req.body.role === 'student') {
                                        new Student({
                                            school: req.body.school,
                                            graduation_grade: req.body.graduation_grade,
                                            career:req.body.career,
                                            person: newPerson._id
                                        }).save((err, newStudent) => {
                                            if (err) {
                                                console.log(err);
                                                req.flash('BAD', 'Ha ocurrido un error.', '/person/student');
                                            } else if (newStudent) {
                                                req.flash('GOOD', 'Se ha guardado el estudiante con éxito', "/person/student");
                                            } else req.flash('OK', 'No se pudo crear el usuario', '/person/student');
                                        })
                                    } else if (req.body.role == 'teacher') {
                                        new Teacher({
                                            university_degree: req.body.university_degree,
                                            fourth_level_degree: req.body.fourth_level_degree,
                                            person: newPerson._id
                                        }).save((err, newTeacher) => {
                                            if (err) {
                                                console.log(err);
                                                req.flash('BAD', 'Ha ocurrido un error.', '/person/teacher');
                                            } else if (newTeacher) {
                                                req.flash('GOOD', 'Se ha realizado el registro con exito', '/person/teacher');
                                            } else req.flash('OK', 'No se pudo crear el usuario', '/person/teacher');
                                        })
                                    } else {
                                        res.status(200).send('Se ha creado el Admin');
                                    }
                                } else {
                                    if (req.user.role == "student") {
                                        req.flash('OK',  'No se pudo crear el usuario', '/person/student');
                                    } else if (req.user.role == "teacher") {
                                        req.flash('OK',  'No se pudo crear el usuario', '/person/teacher');
                                    }
                                }
                            })
                        } else req.flash('OK', 'No se pudo crear el usuario', '/menu-register');
                    })
                }
            });
        }
    } else {
        if (req.user.role == "student") {
            req.flash('OK',  'El número de cédula es incorrecto', '/person/student');
        } else if (req.user.role == "teacher") {
            req.flash('OK', 'El número de cédula es incorrecto', '/person/teacher');
        }
    }
};



PersonController.all_students = (req, res) => {
    var students = Student.find({ status: true });
    students.populate({ path: 'person' }).exec((err, students) => {
        if (err) res.status(500).send("Error en el servidor");
        else {
            if (!students) res.status(404).send("No existen estudiantes");
            else res.status(200).send(students);
        }
    });
}

PersonController.all_teachers = (req, res) => {
    var teachers = Teacher.find({ status: true });
    teachers.populate({ path: 'person' }).exec((err, teachers) => {
        if (err) res.status(500).send("Error en el servidor");
        else {
            if (!teachers) res.status(404).send("No existen estudiantes");
            else res.status(200).send(teachers);
        }
    });
}

PersonController.update_info_person = (req, res) => {
    Person.findByIdAndUpdate(req.params.id, req.body, (err, person) => {
        if (err) req.flash('BAD', "Ha ocurrido un error al actualizar", "/person/myProfile");
        else {
            if (!person) req.flash('OK', "No se pudo actializar", "/person/myProfile");
            else req.flash('GOOD', "Se ha actualizado su información con éxito", "/person/myProfile");
        }
    });
}

PersonController.update_person = (req, res) => {
    var personUpdate = {
        personal_mail: req.body.personal_mail,
        address: req.body.address,
        phone: req.body.phone
    }

    Person.findByIdAndUpdate(req.params.id, personUpdate, (err, person) => {
        if (err) req.flash('BAD', "Ha ocurrido un error al actualizar", "/person/myProfile");
        else {
            if (!person) req.flash('OK', "No se pudo actializar", "/person/myProfile");
            else {
                if (req.body.role === 'student') {
                    personUpdate.school = req.body.school,
                        personUpdate.graduation_grade = req.body.graduation_grade

                    Student.findOneAndUpdate({ person: new ObjectId(req.params.id) }, personUpdate, (err, student) => {
                        if (err) res.status(500).send('Error');
                        else {
                            if (!student) res.status(404).send('No se pudo actualizar');
                            else res.status(200).send('Actualizado Exitosamente');
                        }
                    });
                } else if (req.body.role === 'teacher') {
                    personUpdate.university_degree = req.body.university_degree,
                        personUpdate.fourth_level_degree = req.body.fourth_level_degree,
                        personUpdate.timetable = req.body.timetable

                    Teacher.findOneAndUpdate({ person: new ObjectId(req.params.id) }, personUpdate, (err, teacher) => {
                        if (err) res.status(500).send('Error');
                        else {
                            if (!teacher) res.status(404).send('No se pudo actualizar');
                            else res.status(200).send('Actualizado Exitosamente');
                        }
                    });
                }
            }
        }
    });
};

PersonController.delete_person = (req, res) => {
    Person.findByIdAndUpdate(req.params.id, { status: false }, (err, result) => {
        if (err) res.status(500).send('Error');
        else {
            if (!result) res.status(404).send('No se pudo eliminar la persona');
            else {
                if (req.body.role == 'student') {
                    Student.findOneAndUpdate({ person: new ObjectId(req.params.id) }, { status: false }, (err, result) => {
                        if (err) res.status(500).send('Error');
                        else {
                            if (!result) res.status(404).send('No se pudo eliminar el estudiante');
                            else res.status(200).send('Eliminado Exitosamente');
                        }
                    });
                } else if (req.body.role == 'teacher') {
                    Teacher.findOneAndUpdate({ person: new ObjectId(req.params.id) }, { status: false }, (err, result) => {
                        if (err) res.status(500).send('Error');
                        else {
                            if (!result) res.status(404).send('No se pudo eliminar el docente');
                            else res.status(200).send('Eliminado Exitosamente');
                        }
                    });
                }
            }
        }
    })
};

PersonController.uplodImage = (req, res) => {
    var file_name = "Imagen no encontrada";
    if (req.files) {
        console.log(req.files);
        var file_path = req.files.image.path;
        var file_split = file_path.split('\/');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg') {
            Person.findByIdAndUpdate(req.params.id, { image: file_name }, (err, person) => {
                if (err) console.log(err);
                else {
                    if (person == 0) {
                        req.flash('BAD', "No se pudo actualizar la foto de perfil del usuario", "/person/myProfile");
                    } else {
                        req.flash('GOOD', "Se actualizado la foto de perfil de manera correcta", "/person/myProfile");
                    }
                }
            })
        } else {
            req.flash('OK', "La extension del archivo para la fotografía no es correcta", "/person/myProfile");
        }
    } else {
        req.flash('OK', "No se ha podido subir la imagen", "/person/myProfile");
    }
};

PersonController.getImageFile = (req, res) => {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/person/' + imageFile;

    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: "No existe la imagen" });
        }
    });
};

PersonController.logout = (req, res) => {
    req.logOut();
    res.redirect('/');
};



module.exports = PersonController;