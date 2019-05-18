'use strict'

var Period = require('../models/period.models');
var PeriodController = {};


PeriodController.save_class = (req,res)=>{
    new Period({
        name: req.body.name,
        description: req.body.description
    }).save((err, newPeriod)=>{
        if(err) res.status(500).send("error");
        else{
            if(!newPeriod) res.status(404).send("no se ha guardado");
            else res.status(200).send(newPeriod);
        }
    });
}

PeriodController.get_Class = (req,res)=>{
    var PeriodId = req.params.id;
    Period.findById(PeriodId, (err, Class) =>{
        if (err) res.status(500).send('error en la petición');
        else {
            if (!Period) res.status(404).send('la unidad no existe');
         else res.status(200).send(Period);
        }
    });
}

PeriodController.update_Period= (req, res) => {
    var PeriodId = req.params.id;
    var update = {
        name : req.body.name,
        description : req.body.description
    };

    Period.findByIdAndUpdate(Period, update, (err, PeriodUpdated)=>{
        if (err) res.status(500).send('error al guardar clase');
        else {
            if (!PeriodUpdated) res.status(404).send('no se ha actualizado');
            else res.status(200).send(PeriodUpdated);
        }
    });
}

PeriodController.delete_Class= (req, res) => {
    var PeriodId = req.params.id;

    Period.findByIdAndUpdate(PeriodId,{status:false} ,(err, PeriodRemoved)=>{
        if (err) res.status(500).send('error en la petición');
        else {
            if (!PeriodRemoved) res.status(404).send('error al eliminar');
            else res.status(200).send('Se ha eliminado');
        }
    });
}

PeriodController.all_Period = (req, res) => {
    var Period =Period.find({status:true});
    Period.sort('name').exec((err,Period) => {
        if (err) res.status(500).send("Error");
        else {
            if (!Period) res.status(404).send("error al listar");
            else res.status(200).send(Period);
        }
    });
}


module.exports = PeriodController;