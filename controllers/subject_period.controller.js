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
                }
            }
        });
    }
};


PeriodSubjectController.get_period_subjects = (req, res) => {
    var periodSubjects =  PeriodSubject.find();
    periodSubjects.populate({path:'period'}).populate({path:'subject',populate:{ path: 'curriculum', model: 'Curriculum', populate: { path: 'career', model: 'Career' }}}).exec((err,periodsubjects)=>{
        if(err) console.log(err);
        else res.status(200).send(periodsubjects)
    });
    //res.render('teacherProfile/subject',{title:"Materias Docente",periodSubject:periodsubjects});
};


module.exports = PeriodSubjectController;