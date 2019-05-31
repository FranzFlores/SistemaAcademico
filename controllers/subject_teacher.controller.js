'use strict'

var SubjectTeacher = require('../models/subject_teacher.model');
var Teacher = require('../models/teacher.model');
var helpers = require('../lib/helpers');
var SubjectTeacherController = {};

SubjectTeacherController.save_subject_teacher = (req, res) => {
    var subjects = req.body['subjects[]'];
    var aux=[];
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
                    }else{
                        aux.push(response);
                        if(subjects[subjects.length-1]==element){
                            res.status(200).send(aux);
                        }
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
                }else{
                    res.status(200).send('ingresado');
                }
            }
        });
    }
};


SubjectTeacherController.get_teacher_subjects = (req, res) => {
    var teacherSubjects = SubjectTeacher.find();
    teacherSubjects.populate({path:'teacher',select:'_id',populate:{path:'person',select:'name'}}).populate({path:'subject',select: 'name',populate:{ path: 'curriculum', model: 'Curriculum',select:'_id', populate: { path: 'career', model: 'Career',select: 'name' }}}).exec((err,teachersubjects)=>{
        if(err) console.log(err);
        else res.status(200).send(teachersubjects);
    });
};


SubjectTeacherController.load_teacher_subject_view = (req,res) =>{    
    Teacher.findOne({person:req.params.id},(err,teacher)=>{
        if(err) console.log(err);
        else{
            var teacherSubjects =  SubjectTeacher.find({teacher:teacher._id});
            teacherSubjects.populate({path:'teacher',select:'_id',populate:{path:'person',select:'name'}}).populate({path:'subject',select: 'name',populate:{ path: 'curriculum', model: 'Curriculum',select:'_id', populate: { path: 'career', model: 'Career',select: 'name' }}}).exec((err,teachersubjects)=>{
                if(err) console.log(err);
                else res.render('teacherProfile/subject',{title:"Materias Docente",teacherSubject:teachersubjects});
            });
        }
    });
};




module.exports = SubjectTeacherController;