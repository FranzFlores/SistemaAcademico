'use strict'

var Career = require('../models/career.model');
var CareerController = {};

//Cargar Vistas
CareerController.load_carrer_view = (req,res)=>{
    Career.find().populate({ path: 'faculty' }).exec((err, careers) => {
        if (err) res.status(500).send("Error");
        else res.render('adminProfile/career',{title:'Carreras',careers:careers});
    });
};


CareerController.save_career = (req,res)=>{
    console.log(req.body);
    new Career({
        name: req.body.name,
        description: req.body.description,
        faculty: req.body.faculty,
        diploma: req.body.diploma
    }).save((err, newCareer)=>{
        if(err) {
            console.log(err);
            req.flash('BAD','Ocurrio un error al guardar','/career');
        }
        else{
            if(!newCareer) req.flash('OK','No se pudo guardar la carrera','/career');
            else req.flash('GOOD','Se ha guardado la carrera con exito','/career');
        }
    });
}

CareerController.get_career = (req,res)=>{
    var careerId = req.params.id;
    Career.findById(careerId, (err, career) =>{
        if (err) res.status(500).send('error en la petición');
        else {
            if (!career) res.status(404).send('la carrera no existe');
         else res.status(200).send(career);
        }
    });
}

CareerController.update_career = (req, res) => {
    var careerId = req.params.id;
    var update = {
        name : req.body.name,
        description : req.body.description,
        diploma: req.body.diploma,
        numPeriod: req.body.numPeriod,
        timePeriod: req.body.timePeriod
    };

    Career.findByIdAndUpdate(careerId, update, (err, careerUpdated)=>{
        if (err) req.flash('BAD','Ocurrio un error al actualizar','/career');
        else {
            if (!careerUpdated) req.flash('OK','No se pudo actualizar la carrera','/career');
            else req.flash('GOOD','Se ha actualizado la carrera con exito','/career');
        }
    });
}

CareerController.delete_career = (req, res) => {
    Career.findByIdAndRemove(req.params.id,(err,careerRemoved) =>{
        if (err) req.flash('BAD','Ocurrio un error al eliminar','/career');
        else {
            if (!careerRemoved) req.flash('OK','No se pudo eliminar la carrera','/career');
            else req.flash('GOOD','Se ha eliminado la carrera con exito','/career');
        }
    });
};

CareerController.all_careers = (req, res) => {
    var careers = Career.find({status:true});
    careers.populate({ path: 'faculty' }).exec((err, careers) => {
        if (err) res.status(500).send("Error");
        else {
            if (!careers) res.status(404).send("error al listar");
            else res.status(200).send(careers);
        }
    });
}

module.exports = CareerController;