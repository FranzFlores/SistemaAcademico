'use strict'

var Period = require('../models/period.model');
var PeriodSubject = require('../models/subject_period.model');
var helpers = require('../lib/helpers');
var PeriodController = {};

//Cargar Vistas
PeriodController.load_period_view = (req, res) => {
    Period.find({ status: true }, (err, periods) => {
        if (err) console.log(err);
        else res.render('adminProfile/period', { title: 'Períodos', periods: periods });
    });
};



PeriodController.save_period = (req, res) => {
    var startDate = helpers.formatDate(req.body.start);
    var endDate = helpers.formatDate(req.body.end);

    new Period({
        name: req.body.name,
        start: startDate,
        end: endDate
    }).save((err, newPeriod) => {
        if (err) req.flash('BAD', 'Ocurrio un error al guardar el período', '/period');
        else {
            if (!newPeriod) req.flash('OK', 'No se pudo guardar el período', '/period');
            else req.flash('GOOD', 'Se ha guardado el período con exito', '/period');
        }
    });
}

PeriodController.get_Period = (req, res) => {
    var PeriodId = req.params.id;
    Period.findById(PeriodId, (err, Class) => {
        if (err) res.status(500).send('error en la petición');
        else {
            if (!Period) res.status(404).send('la unidad no existe');
            else res.status(200).send(Period);
        }
    });
}

PeriodController.update_Period = (req, res) => {
    var PeriodId = req.params.id;
    var update = {
        name: req.body.name,
        description: req.body.description
    };

    Period.findByIdAndUpdate(Period, update, (err, PeriodUpdated) => {
        if (err) res.status(500).send('error al guardar clase');
        else {
            if (!PeriodUpdated) res.status(404).send('no se ha actualizado');
            else res.status(200).send(PeriodUpdated);
        }
    });
}

PeriodController.delete_Class = (req, res) => {
    var PeriodId = req.params.id;

    Period.findByIdAndUpdate(PeriodId, { status: false }, (err, PeriodRemoved) => {
        if (err) res.status(500).send('error en la petición');
        else {
            if (!PeriodRemoved) res.status(404).send('error al eliminar');
            else res.status(200).send('Se ha eliminado');
        }
    });
}

PeriodController.all_Period = (req, res) => {
    var Period = Period.find({ status: true });
    Period.sort('name').exec((err, Period) => {
        if (err) res.status(500).send("Error");
        else {
            if (!Period) res.status(404).send("error al listar");
            else res.status(200).send(Period);
        }
    });
}

PeriodController.add_subject_period = (req, res) => {

   
};


module.exports = PeriodController;