'use strict'

var Enrollment = require('../models/enrollment.models');
var EnrollmentController = {};


EnrollmentController.save_class = (req,res)=>{
    new Enrollment({
        name: req.body.name,
        description: req.body.description
    }).save((err, newEnrollment)=>{
        if(err) res.status(500).send("error");
        else{
            if(!newEnrollment) res.status(404).send("no se ha guardado");
            else res.status(200).send(newEnrollment);
        }
    });
}

EnrollmentController.get_Class = (req,res)=>{
    var EnrollmentId = req.params.id;
    Enrollment.findById(EnrollmentId, (err, Class) =>{
        if (err) res.status(500).send('error en la petición');
        else {
            if (!Enrollment) res.status(404).send('la unidad no existe');
         else res.status(200).send(Enrollment);
        }
    });
}

EnrollmentController.update_Enrollment = (req, res) => {
    var EnrollmentId = req.params.id;
    var update = {
        name : req.body.name,
        description : req.body.description
    };

    Enrollment.findByIdAndUpdate(EnrollmentId, update, (err, EnrollmentUpdated)=>{
        if (err) res.status(500).send('error al guardar clase');
        else {
            if (!EnrollmentUpdated) res.status(404).send('no se ha actualizado');
            else res.status(200).send(EnrollmentUpdated);
        }
    });
}

EnrollmentController.delete_Class= (req, res) => {
    var EnrollmentId = req.params.id;

    Enrollment.findByIdAndUpdate(EnrollmentId,{status:false} ,(err, EnrollmentRemoved)=>{
        if (err) res.status(500).send('error en la petición');
        else {
            if (!EnrollmentRemoved) res.status(404).send('error al eliminar');
            else res.status(200).send('Se ha eliminado');
        }
    });
}

EnrollmentController.all_Enrollment = (req, res) => {
    var Enrollment =Enrollment.find({status:true});
    Enrollment.sort('name').exec((err, Enrollment) => {
        if (err) res.status(500).send("Error");
        else {
            if (!Enrollment) res.status(404).send("error al listar");
            else res.status(200).send(Enrollment);
        }
    });
}


module.exports = EnrollmentController;
