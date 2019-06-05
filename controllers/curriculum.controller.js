'use strict'

var Curriculum = require('../models/curriculum.model');
var CurriculumController = {};

//Cargar Vistas
CurriculumController.load_curriculum_view = (req,res)=>{
    Curriculum.find().populate({path:'career'}).exec((err,curriculums)=>{
        if(err) console.log(err);
        else{
            console.log(curriculums);
            res.render('adminProfile/curriculum',{title:'Malla Curricular',curriculums: curriculums});
        }
    });
};

CurriculumController.save_curriculum = (req,res)=>{
    new Curriculum({
        year: req.body.year,
        image: "null",
        numPeriod: req.body.numPeriod,
        timePeriod: req.body.timePeriod,
        career: req.body.career
    }).save((err, newCurriculum)=>{
        if(err) req.flash('BAD', "Ha ocurrido un error al guardar la malla curricular","/curriculum");
        else{
            if(!newCurriculum) req.flash('OK', "No se pudo guardar la malla curricular","/curriculum");
            else req.flash('GOOD', "Se ha guardado la malla curricular con éxito","/curriculum");
        }
    });
}

CurriculumController.get_curriculum = (req,res)=>{
    var curriculumId = req.params.id;
    Curriculum.findById(curriculumId, (err, curriculum) =>{
        if (err) res.status(500).send('error en la petición');
        else {
            if (!curriculum) res.status(404).send('la malla curricular no existe');
         else res.status(200).send(curriculum);
        }
    });
}

CurriculumController.update_curriculum = (req, res) => {
    var curriculumId = req.params.id;
    var update = {
        year : req.body.year,
        numPeriod : req.body.numPeriod,
        timePeriod: req.body.timePeriod,
        career: req.body.career
    };

    Curriculum.findByIdAndUpdate(curriculumId, update, (err, curriculumUpdated)=>{
        if (err) req.flash('BAD', "Ha ocurrido un error al guardar la malla curricular","/curriculum");
        else {
            if(!curriculumUpdated) req.flash('OK', "No se pudo guardar la malla curricular","/curriculum");
            else req.flash('GOOD', "Se ha guardado la malla curricular con éxito","/curriculum");
        }
    });
}

CurriculumController.delete_curriculum = (req, res) => {
    Curriculum.findByIdAndRemove(req.params.id,(err,curriculumRemoved) =>{
        if (err) req.flash('BAD','Ocurrio un error al eliminar','/curriculum');
        else {
            if (!curriculumRemoved) req.flash('OK','No se pudo eliminar la carrera','/curriculum');
            else req.flash('GOOD','Se ha eliminado la carrera con exito','/curriculum');
        }
        
    });
};

CurriculumController.all_curriculum = (req, res) => {
    var curriculums = Curriculum.find();
    curriculums.populate({ path: 'career' }).exec((err, curriculums) => {
        if (err) res.status(500).send("Error");
        else {
            if (!curriculums) res.status(404).send("error al listar");
            else res.status(200).send(curriculums);
        }
    });
}

module.exports = CurriculumController;
