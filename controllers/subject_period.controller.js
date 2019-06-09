'use strict'

var PeriodSubject = require('../models/subject_period.model');
var helpers = require('../lib/helpers');
var PeriodSubjectController = {};

PeriodSubjectController.save_subject_period = (req, res) => {
    var subjects = req.body['subjects[]'];
    if (Array.isArray(subjects)) {
        subjects.forEach(element => {
            PeriodSubject.findOne({ subject: element }, (err, response) => {
                if (err) console.log(err);
                else {
                    if (response == null) {
                        new PeriodSubject({
                            subject: element,
                            period: req.body.period
                        }).save((err, periodSubject) => {
                            if (err) res.send('error');
                            else {
                                console.log(periodSubject);
                                if (subjects[subjects.length - 1] == element) {
                                    res.status(200).send('ok');
                                }
                            }
                        });
                    }else{
                        res.status(200).send('yes');
                    }
                }
            });
        });
    } else {
        PeriodSubject.findOne({ subject: subjects }, (err, response) => {
            if (err) console.log(err);
            else {
                console.log(response);
                if (response == null) {
                    new PeriodSubject({
                        subject: subjects,
                        period: req.body.period
                    }).save((err, periodSubject) => {
                        if (err) res.send('error');
                        else if (periodSubject) res.status(200).send('ok');
                    });
                }else{
                    res.status(200).send('yes');
                }
            }
        });
    }
};


PeriodSubjectController.all_period_subjects = (req, res) => {
    PeriodSubject.find().populate({path: 'period',select:'name'}).populate({path: 'subject',select:'name',populate: { path: 'curriculum_cycle',select:'_id', populate: { path: 'curriculum',select:'_id', populate:{path:'career',select:'name'}}}}).exec((err, periodsubjects) => {
        if (err) console.log(err);
        else res.status(200).send(periodsubjects)
    });
};

module.exports = PeriodSubjectController;