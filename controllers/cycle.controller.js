'use strict'

var Cycle = require('../models/cycle.model');
var CycleController = {};

CycleController.save_cycle = (req, res) => {
    new Cycle({
        number: req.body.number,
        name: req.body.name
    }).save((err, cycle) => {
        if (err) console.log(err);
        else res.status(200).send(cycle);
    });
};

CycleController.all_cycle = (req, res) => {
    Cycle.find((err, cycles) => {
        if (err) console.log(err);
        else res.status(200).send(cycles);
    });
};

module.exports = CycleController;