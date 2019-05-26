'use strict'

var Subject = require('../models/subject.model');
var SubjectController = {};

SubjectController.load_subject_view = (req,res)=>{
    var subjects = Subject.find({status:true});
    subjects.populate({ path: 'curriculum',populate:{path:'career',model:'Career'} }).exec((err, subjects) => {
        if (err) res.status(500).send("Error");
        else res.render('adminProfile/subject',{title:'Materia',subjects:subjects});
    });
};


SubjectController.save_subject = (req,res)=>{
    new Subject({
        name: req.body.name,
        numCredit: req.body.numCredit,
        curriculum: req.body.curriculum
    }).save((err, newSubject)=>{
        if(err) req.flash('BAD','Ocurrio un error al guardar la materia','/subject');
        else{
            if(!newSubject) req.flash('OK','No se pudo guardar la materia','/subject');
            else req.flash('GOOD','Se ha guardado la materia con exito','/subject');
        }
    });
}

SubjectController.get_subject = (req,res)=>{
    var subjectId = req.params.id;
    Subject.findById(subjectId, (err, subject) =>{
        if (err) res.status(500).send('error en la petición');
        else {
            if (!subject) res.status(404).send('la carrera no existe');
         else res.status(200).send(subject);
        }
    });
}

SubjectController.update_subject = (req, res) => {
    var subjectId = req.params.id;
    var update = {
        name: req.body.name,
        numCredit: req.body.numCredit,
        syllable: req.body.syllable
    };

    Subject.findByIdAndUpdate(subjectId, update, (err, subjectUpdated)=>{
        if (err) res.status(500).send('error al guardar carrera');
        else {
            if (!subjectUpdated) res.status(404).send('no se ha actualizado');
            else res.status(200).send(subjectUpdated);
        }
    });
}

SubjectController.delete_subject = (req, res) => {
    var subjectId = req.params.id;

    Subject.findByIdAndUpdate(subjectId,{status:false} ,(err, subjectRemoved)=>{
        if (err) res.status(500).send('error en la petición');
        else {
            if (!subjectRemoved) res.status(404).send('error al eliminar');
            else res.status(200).send('Se ha eliminado');
        }
    });
}

SubjectController.all_subject = (req, res) => {
    var subjects = Subject.find({status:true});
    subjects.populate({ path: 'career' }).exec((err, subjects) => {
        if (err) res.status(500).send("Error");
        else {
            if (!subjects) res.status(404).send("error al listar");
            else res.status(200).send(subjects);
        }
    });
}

module.exports = SubjectController;
