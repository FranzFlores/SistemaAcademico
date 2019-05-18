'use strict'

var Faculty = require('../models/faculty.model');
var FacultyController = {};


FacultyController.save_faculty = (req,res)=>{
    new Faculty({
        name: req.body.name,
        description: req.body.description
    }).save((err, newFaculty)=>{
        if(err) res.status(500).send("error");
        else{
            if(!newFaculty) res.status(404).send("no se ha guardado");
            else res.status(200).send(newFaculty);
        }
    });
}

FacultyController.get_faculty = (req,res)=>{
    var facultyId = req.params.id;
    Faculty.findById(facultyId, (err, faculty) =>{
        if (err) res.status(500).send('error en la petición');
        else {
            if (!faculty) res.status(404).send('la facultad no existe');
         else res.status(200).send(faculty);
        }
    });
}

FacultyController.update_faculty = (req, res) => {
    var facultyId = req.params.id;
    var update = {
        name : req.body.name,
        description : req.body.description
    };

    Faculty.findByIdAndUpdate(facultyId, update, (err, facultyUpdated)=>{
        if (err) res.status(500).send('error al guardar facultad');
        else {
            if (!facultyUpdated) res.status(404).send('no se ha actualizado');
            else res.status(200).send(facultyUpdated);
        }
    });
}

FacultyController.delete_faculty = (req, res) => {
    var facultyId = req.params.id;

    Faculty.findByIdAndUpdate(facultyId,{status:false} ,(err, facultyRemoved)=>{
        if (err) res.status(500).send('error en la petición');
        else {
            if (!facultyRemoved) res.status(404).send('error al eliminar');
            else res.status(200).send('Se ha eliminado');
        }
    });
}

FacultyController.all_faculty = (req, res) => {
    var facults = Faculty.find({status:true});
    facults.sort('name').exec((err, facults) => {
        if (err) res.status(500).send("Error");
        else {
            if (!facults) res.status(404).send("error al listar");
            else res.status(200).send(facults);
        }
    });
}


module.exports = {
    FacultyController
};
