'use strict'
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var ObjectId = require('mongoose').Types.ObjectId;


var Person = require('../models/person.model');
var Student = require('../models/student.model');
var Teacher = require('../models/teacher.model');

const PersonController = {};

//Cargar Vistas 
PersonController.load_register_teacher = (req, res) => {
    res.render('register/register-teacher', { title: "Registro de Docente" });
};

PersonController.load_register_student = (req, res) => {
    res.render('register/register-student', { title: "Registro de Estudiante" });
};

//Registro de Personas
PersonController.savePerson = (req, res) => {
    console.log(req.body);
    var dni_person = req.body.dni_person;
    var phone = req.body.phone;

    //valida que la cédula sea correcta
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
            req.flash('BAD', 'El número de cédula es incorrecto','/menu-register');
        }
    }

    //validar los campos que unicamente contienen numeros
    var RegExPattern = /[0-9]/;
    if ((!cad.match(RegExPattern)) || (!phone.match(RegExPattern))) {
        req.flash('OK', 'Los campos cédula o teléfono unicamente deben contener numeros','/menu-register');   
    }

    var email = (req.body.institutional_mail).split('\@');
    if (!email[1] == "unl.edu.ec") {
        req.flash('OK', 'El Correo Institucional es Incorrecto','/menu-register');
    }

    //validar los campos que unicamente contienen letras
    var RegExPattern1 = /[a-zA-Z ]/;
    if ((!(req.body.name).match(RegExPattern1))) {
        req.flash('OK', 'El nombre unicamente debe contener letras', '/menu-register');
    }

    var birthday = (req.body.birthday).split('\/');
    var year = birthday[0];
    var month = birthday[1];
    var day = birthday[2];
    var birthday_user = new Date(year, month, day);

    Person.findOne({ dni_person: req.body.dni_person }, (err, personResult) => {
        if (err) {
            console.log(err);
            req.flash('BAD', 'Ha ocurrido un error.', '/menu-register');
        } else if (personResult) req.flash('OK', 'El usuario ya existe', '/menu-register');
        else {
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
                    console.log(err);
                    req.flash('BAD', 'Ha ocurrido un error.', '/menu-register');
                } else if (newPerson) {
                    new Account({
                        user_name: req.body.institutional_mail,
                        password: helpers.generateHash(newPerson.dni_person),
                        person: newPerson._id
                    }).save((err, newAccount) => {
                        if (err) {
                            console.log(err);
                            req.flash('BAD', 'Ha ocurrido un error.', '/menu-register');
                        } else if (newAccount) {
                            if (req.body.role === 'student') {
                                new Student({
                                    school: req.body.school,
                                    graduation_grade: req.body.graduation_grade,
                                    person: newPerson._id
                                }).save((err, newStudent) => {
                                    if (err) {
                                        console.log(err);
                                        req.flash('BAD', 'Ha ocurrido un error.', '/menu-register');
                                    } else if (newStudent) {
                                        req.flash('GOOD', 'Se ha realizado el registro con exito');
                                    } else req.flash('OK', 'No se pudo crear el usuario');
                                })
                            } else if (req.body.role == 'teacher') {
                                new Teacher({
                                    university_degree: req.body.university_degree,
                                    fourth_level_degree: req.body.fourth_level_degree,
                                    timetable: req.body.timetable,
                                    person: newPerson._id
                                }).save((err, newTeacher) => {
                                    if (err) {
                                        console.log(err);
                                        req.flash('BAD', 'Ha ocurrido un error.', '/menu-register');
                                    } else if (newTeacher) {
                                        req.flash('GOOD', 'Se ha realizado el registro con exito', '/login');
                                    } else req.flash('OK', 'No se pudo crear el usuario', '/menu-register');
                                })
                            } else {
                                res.status(200).send('Se ha creado el Admin');
                            }
                        } else req.flash('OK', 'No se pudo crear el usuario', '/menu-register');
                    })
                } else req.flash('OK', 'No se pudo crear el usuario', '/menu-register');
            })
        }
    });
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


PersonController.update_person = (req, res) => {
    var personUpdate = {
        dni_person: req.body.dni,
        name: req.body.name,
        gender: req.body.gender,
        birthday: req.body.birthday,
        institutional_mail: req.body.institutional_mail,
        personal_mail: req.body.personal_mail,
        address: req.body.address,
        phone: req.body.phone
    }

    Person.findByIdAndUpdate(req.params.id, personUpdate, (err, person) => {
        if (err) res.status(500).send("Error en el servidor");
        else {
            if (!person) res.status(404).send("No se actualizado la persona");
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

PersonController.updalodImage = (req, res) => {
    var file_name = "Imagen no encontrada";
    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\/');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg') {
            Person.findByIdAndUpdate(req.body._id, { image: file_name }, (err, person) => {
                if (err) console.log(err);
                else {
                    if (person == 0) {
                        req.flash('message', "No se pudo actualizar la foto de perfil del usuario");
                    } else {
                        req.flash('success', "Se actualizado de manera correcta el usuario");
                    }
                    res.redirect('/profile');
                }
            })
        } else {
            req.flash('message', "La extension del archivo no es correcta");
        }
        res.redirect('/profile');
    } else {
        res.status(200).send({ message: "No se ha podido subir ninguna imagen" });
    }
};


module.exports = PersonController;