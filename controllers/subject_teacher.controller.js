'use strict'

var SubjectTeacher = require('../models/subject_teacher.model');
var helpers = require('../lib/helpers');
var SubjectTeacherController = {};

SubjectTeacherController.save_subject_teacher = (req, res) => {
    var subjects = req.body['subjects[]'];
    if (Array.isArray(subjects)) {
        subjects.forEach(element => {
            SubjectTeacher.findOne({ subject: element }, (err, response) => {
                if (err) console.log(err);
                else {
                    if (response == null) {
                        new SubjectTeacher({
                            subject: element,
                            teacher: req.body.teacher
                        }).save((err, teacherSubject) => {
                            if (err) res.send('error');
                            else{
                                console.log(teacherSubject);
                                if(subjects[subjects.length-1]==element){
                                    res.status(200).send('ok');
                                }
                            }
                        });
                    }
                }
            });
        });
    } else {
        SubjectTeacher.findOne({ subject: subjects }, (err, response) => {
            if (err) console.log(err);
            else {
                if (response == null) {
                    new SubjectTeacher({
                        subject: subjects,
                        teacher: req.body.teacher
                    }).save((err, subjectTeacher) => {
                        if (err) res.send('error');
                        else if (subjectTeacher) res.status(200).send('ok');
                    });
                }
            }
        });
    }
};


SubjectTeacherController.get_period_subjects = (req, res) => {
    var periodSubjects =  PeriodSubject.find();
    periodSubjects.populate({path:'period'}).populate({path:'subject',populate:{ path: 'curriculum', model: 'Curriculum', populate: { path: 'career', model: 'Career' }}}).exec((err,periodsubjects)=>{
        if(err) console.log(err);
        else res.status(200).send(periodsubjects)
    });
    //res.render('teacherProfile/subject',{title:"Materias Docente",periodSubject:periodsubjects});
};


module.exports = SubjectTeacherController;