'use strict'

var Faculty = require('../models/faculty.model');
var FacultyController = {};

//Cargar Vista de Facultad
FacultyController.load_faculty_view = (req,res)=>{
    Faculty.find({status:true},(err,faculties)=>{
        if(err) console.log("Error " + err);
        else res.render('adminProfile/faculty',{title:"Facultad",faculties: faculties});
    });
};


FacultyController.save_faculty = (req,res)=>{
    new Faculty({
        name: req.body.name,
        description: req.body.description
    }).save((err, newFaculty)=>{
        if(err){
            console.log(err);
            req.flash("BAD","Error al guardar la facultad","/faculty");
        } 
        else{
            if(!newFaculty) res.status(404).send("no se ha guardado");
            else req.flash("GOOD","Se ha creado la facultad con éxito","/faculty");
        }
    });
}

FacultyController.get_faculty = (req,res)=>{
    var facultyId = req.params.id;
    Faculty.findById(facultyId, (err, faculty) =>{
        if (err) console.log(err);
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
        if (err){
            console.log(err);
            req.flash("BAD","Error al actualizar la facultad","/faculty");
        } 
        else {
            if (!facultyUpdated) res.status(404).send('no se ha actualizado');
            else req.flash("GOOD","Se ha actualizado la facultad con éxito","/faculty");
        }
    });
}

FacultyController.delete_faculty = (req, res) => {
    var facultyId = req.params.id;

    Faculty.findByIdAndUpdate(facultyId,{status:false} ,(err, facultyRemoved)=>{
        if (err) req.flash("BAD","Error al actualizar la facultad","/faculty");
        else {
            if (!facultyRemoved) res.status(404).send('error al eliminar');
            else req.flash("GOOD","Se ha actualizado la facultad con éxito","/faculty");
        }
    });
}

FacultyController.all_faculties = (req, res) => {
    var facults = Faculty.find({status:true});
    facults.sort('name').exec((err, facults) => {
        if (err) res.status(500).send("Error");
        else {
            if (!facults) res.status(404).send("error al listar");
            else res.status(200).send(facults);
        }
    });
}


module.exports = FacultyController;
