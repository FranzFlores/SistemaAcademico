'use strict'
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var ObjectId = require('mongoose').Types.ObjectId;


var Person = require('../models/person.model');
var Student = require('../models/student.model');
var Teacher = require('../models/teacher.model');

const PersonController = {};

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