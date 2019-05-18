'use strict'

var Career = require('../models/career.model');
var CareerController = {};

CareerController.save_career = (req,res)=>{
    new Career({
        name: req.body.name,
        description: req.body.description,
        diploma: req.body.diploma,
        numPeriod: req.body.numPeriod,
        timePeriod: req.body.timePeriod
    }).save((err, newCareer)=>{
        if(err) res.status(500).send("error en la petición");
        else{
            if(!newCareer) res.status(404).send("no se ha guardado");
            else res.status(200).send(newCareer);
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
        if (err) res.status(500).send('error al guardar carrera');
        else {
            if (!careerUpdated) res.status(404).send('no se ha actualizado');
            else res.status(200).send(careerUpdated);
        }
    });
}

CareerController.delete_career = (req, res) => {
    var careerId = req.params.id;

    Career.findByIdAndUpdate(careerId,{status:false} ,(err, careerRemoved)=>{
        if (err) res.status(500).send('error en la petición');
        else {
            if (!careerRemoved) res.status(404).send('error al eliminar');
            else res.status(200).send('Se ha eliminado');
        }
    });
}

CareerController.all_career = (req, res) => {
    var careers = Career.find({status:true});
    careers.populate({ path: 'faculty' }).exec((err, careers) => {
        if (err) res.status(500).send("Error");
        else {
            if (!careers) res.status(404).send("error al listar");
            else res.status(200).send(careers);
        }
    });
}

module.exports = {
    CareerController
};