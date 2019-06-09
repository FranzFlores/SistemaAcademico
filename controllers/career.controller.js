'use strict'

var Career = require('../models/career.model');
var Faculty = require('../models/faculty.model');
var Curriculum = require('../models/curriculum.model');

var CareerController = {};

//Cargar Vistas
CareerController.load_carrer_view = (req, res) => {
    Career.find().populate({ path: 'faculty' }).exec((err, careers) => {
        if (err) console.log(err);
        else res.render('adminProfile/career', { title: 'Carreras', careers: careers });
    });
};


CareerController.save_career = (req, res) => {
    new Career({
        name: req.body.name,
        description: req.body.description,
        faculty: req.body.faculty,
        diploma: req.body.diploma
    }).save((err, newCareer) => {
        if (err) {
            console.log(err);
            req.flash('BAD', 'Ocurrio un error al guardar', '/career');
        }
        else {
            Faculty.findByIdAndUpdate(req.body.faculty,{$push:{careers:newCareer._id}},{new:true},(err,carrer)=>{
                if(err) console.log(err);
                else{
                    if (!newCareer) req.flash('OK', 'No se pudo guardar la carrera', '/career');
                    else req.flash('GOOD', 'Se ha guardado la carrera con exito', '/career');
                }
            });
        }
    });
}

CareerController.all_careers = (req, res) => {
    Career.find().populate({ path: 'faculty', select: "name" }).exec((err, careers) => {
        if (err) res.status(500).send("Error");
        else res.status(200).send(careers);
    });
}

CareerController.get_career = (req, res) => {
    Career.findById(req.params.id, (err, career) => {
        if (err) res.status(500).send('error en la petición');
        else res.status(200).send(career);
    });
}

CareerController.update_career = (req, res) => {
    var update = {
        name: req.body.name,
        description: req.body.description,
        faculty: req.body.faculty,
        diploma: req.body.diploma
    };

    Career.findByIdAndUpdate(req.params.id, update, (err, careerUpdated) => {
        if (err) req.flash('BAD', 'Ocurrio un error al actualizar', '/career');
        else {
            if (!careerUpdated) req.flash('OK', 'No se pudo actualizar la carrera', '/career');
            else req.flash('GOOD', 'Se ha actualizado la carrera con exito', '/career');
        }
    });
}

CareerController.delete_career = (req, res) => {
    Curriculum.findOne({ career: req.params.id }, (err, result) => {
        if (err) console.log(err);
        else {
            if (result) {
                res.status(200).send('Yes');
            } else {
                Career.findByIdAndRemove(req.params.id, (err, careerRemoved) => {
                    if (err) console.log(err);
                    else res.status(200).send('OK');
                });
            }
        }
    });
};

module.exports = CareerController;