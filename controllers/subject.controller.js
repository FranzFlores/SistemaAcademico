'use strict'

var Subject = require('../models/subject.model');
var CurriculumCycle = require('../models/curriculum_cycle.model');
var SubjectTeacher = require('../models/subject_teacher.model');
var SubjectPeriod = require('../models/subject_period.model');
var SubjectController = {};

SubjectController.load_subject_view = (req, res) => {
    Subject.find().populate({ path: 'curriculum_cycle', populate: { path: 'curriculum', select: 'year', populate: { path: "career", select: 'name' } } }).populate({ path: 'curriculum_cycle', populate: { path: "cycle", select: 'name' } }).exec((err, subjects) => {
        console.log(subjects);
        if (err) res.status(500).send("Error");
        else res.render('adminProfile/subject', { title: 'Materia', subjects: subjects });
    });
};

SubjectController.save_subject = (req, res) => {
    CurriculumCycle.findOne({ curriculum: req.body.curriculum, cycle: req.body.cycle }, (err, curriculum_cycle) => {
        if (err) console.log(err);
        else {
            if (curriculum_cycle) {
                new Subject({
                    name: req.body.name,
                    numCredit: req.body.numCredit,
                    curriculum_cycle: curriculum_cycle
                }).save((err, newSubject) => {
                    if (err) {
                        console.log(err);
                        req.flash('BAD', 'Ocurrio un error al guardar la materia', '/subject');
                    }
                    else {
                        CurriculumCycle.findByIdAndUpdate(curriculum_cycle._id,{$push:{subjects:newSubject}},{new:true},(err,result)=>{
                            if(err) console.log(err);
                            else{
                                if (!newSubject) req.flash('OK', 'No se pudo guardar la materia', '/subject');
                                else req.flash('GOOD', 'Se ha guardado la materia con exito', '/subject');
                            }
                        });         
                    }
                });
            } else {
                req.flash('OK', 'Error. Ha seleccionado un ciclo erróneo para la malla curricular', '/subject');
            }
        }
    })
}

SubjectController.all_subject = (req, res) => {
    Subject.find().sort('name').populate({ path: 'curriculum_cycle', populate: { path: 'curriculum', select: 'year', populate: { path: "career", select: 'name' } } }).exec((err, subjects) => {
        if (err) res.status(500).send("Error");
        else res.status(200).send(subjects);
    });
}

SubjectController.get_subject = (req, res) => {
    Subject.findById(req.params.id, (err, subject) => {
        if (err) res.status(500).send('error en la petición');
        else res.status(200).send(subject);
    });
}

SubjectController.update_subject = (req, res) => {
    CurriculumCycle.findOne({ curriculum: req.body.curriculum, cycle: req.body.cycle }, (err, curriculum_cycle) => {
        if (err) console.log(err);
        else {
            if (curriculum_cycle) {
                var update = {
                    name: req.body.name,
                    numCredit: req.body.numCredit,
                    curriculum_cycle: curriculum_cycle
                };
                Subject.findByIdAndUpdate(req.params.id, update, (err, subjectUpdated) => {
                    if (err) req.flash('BAD', 'Ocurrio un error al actualizar la materia', '/subject');
                    else {
                        if (!subjectUpdated) req.flash('OK', 'No se pudo actualizar la materia', '/subject');
                        else req.flash('GOOD', 'Se ha actualizado la materia con éxito', '/subject');
                    }
                });
            } else {
                req.flash('OK', 'Error. Ha seleccionado un ciclo erróneo para la malla curricular', '/subject');
            }
        }
    });
}

SubjectController.delete_subject = (req, res) => {

    SubjectTeacher.findOne({ subject: req.params.id }, (err, subjectTeacher) => {
        if (err) console.log(err);
        else {
            if (subjectTeacher) {
                res.status(200).send('Yes');
            } else {
                SubjectPeriod.findOne({ subject: req.params.id }, (err, subjectPeriod) => {
                    if (err) console.log(err);
                    else {
                        if (subjectPeriod) {
                            res.status(200).send('Yes');
                        } else {
                            Subject.findByIdAndRemove(req.params.id, (err, subjectRemoved) => {
                                if (err) console.log(err);
                                else res.status(200).send('OK');
                            });
                        }
                    }
                });
            }
        }
    });
}

module.exports = SubjectController;
