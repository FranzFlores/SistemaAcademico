'use strict'

var Faculty = require('../models/faculty.model');
var Career = require('../models/career.model');
var FacultyController = {};

//Cargar Vista de Facultad
FacultyController.load_faculty_view = (req, res) => {
    Faculty.find((err, faculties) => {
        if (err) console.log("Error " + err);
        else res.render('adminProfile/faculty', { title: "Facultad", faculties: faculties });
    });
};


FacultyController.save_faculty = (req, res) => {
    new Faculty({
        name: req.body.name,
        description: req.body.description
    }).save((err, newFaculty) => {
        if (err) {
            console.log(err);
            req.flash("BAD", "Error al guardar la facultad", "/faculty");
        }
        else {
            if (!newFaculty) res.status(404).send("no se ha guardado");
            else req.flash("GOOD", "Se ha creado la facultad con éxito", "/faculty");
        }
    });
}

FacultyController.all_faculties = (req, res) => {
    Faculty.find().sort('name').exec((err, facults) => {
        if (err) res.status(500).send("Error");
        else {
            if (!facults) res.status(404).send("error al listar");
            else res.status(200).send(facults);
        }
    });
}

FacultyController.get_faculty = (req, res) => {
    Faculty.findById(req.params.id, (err, faculty) => {
        if (err) console.log(err);
        else res.status(200).send(faculty);
    });
}

FacultyController.update_faculty = (req, res) => {
    var update = {
        name: req.body.name,
        description: req.body.description
    };

    Faculty.findByIdAndUpdate(req.params.id, update, (err, facultyUpdated) => {
        if (err) {
            console.log(err);
            req.flash("BAD", "Error al actualizar la facultad", "/faculty");
        }
        else {
            if (!facultyUpdated) req.flash("OK", "No se pudo actualizar la facultad", "/faculty");
            else req.flash("GOOD", "Se ha actualizado la facultad con éxito", "/faculty");
        }
    });
}



FacultyController.delete_faculty = (req, res) => {

    Career.findOne({ faculty: req.params.id }, (err, result) => {
        if (err) console.log(err);
        else {
            if (result) {
                res.status(200).send('Yes');
            } else {
                Faculty.findByIdAndRemove(req.params.id, (err, facultyRemoved) => {
                    if (err) console.log(err);
                    else res.status(200).send('OK');
                });
            }
        }
    });
};




module.exports = FacultyController;
