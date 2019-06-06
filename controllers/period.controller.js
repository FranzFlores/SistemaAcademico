'use strict'

var Period = require('../models/period.model');
var PeriodSubject = require('../models/subject_period.model');
var helpers = require('../lib/helpers');
var PeriodController = {};

//Cargar Vistas
PeriodController.load_period_view = (req, res) => {
    Period.find((err, periods) => {
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

PeriodController.all_Period = (req, res) => {
    Period.find().sort('name').exec((err, Period) => {
        if (err) req.flash('BAD', 'Ocurrio un error al actualizado  el período', '/period');
        else {
            if (!newPeriod) req.flash('OK', 'No se pudo actualizado el período', '/period');
            else req.flash('GOOD', 'Se ha actualizado el período con exito', '/period');
        }
    });
}

PeriodController.get_Period = (req, res) => {
    Period.findById(req.params.id, (err, period) => {
        if (err) res.status(500).send('error en la petición');
        else {
            res.status(200).send(period);
        }
    });
}

PeriodController.update_Period = (req, res) => {
    var startDate = helpers.formatDate(req.body.start);
    var endDate = helpers.formatDate(req.body.end);
    var update = {
        name: req.body.name,
        start: startDate,
        end: endDate
    };

    Period.findByIdAndUpdate(req.params.id, update, (err, PeriodUpdated) => {
        if (err) req.flash('BAD', 'Ocurrio un error al actualizado  el período', '/period');
        else {
            if (!PeriodUpdated) req.flash('OK', 'No se pudo actualizado el período', '/period');
            else req.flash('GOOD', 'Se ha actualizado el período con exito', '/period');
        }
    });
}

PeriodController.delete_Period = (req, res) => {

    Period.findByIdAndUpdate(req.params.id, { status: false }, (err, PeriodRemoved) => {
        if (err) req.flash('BAD', 'Ocurrio un error al actualizado  el período', '/period');
        else {
            if (!newPeriod) req.flash('OK', 'No se pudo actualizado el período', '/period');
            else req.flash('GOOD', 'Se ha actualizado el período con exito', '/period');
        }
    });
}



PeriodController.add_subject_period = (req, res) => {

   
};


module.exports = PeriodController;