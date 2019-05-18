'use strict'

var Curriculum = require('../models/curriculum.model');
var CurriculumController = {};

CurriculumController.save_curriculum = (req,res)=>{
    new Curriculum({
        year: req.body.year,
        image: req.body.image
    }).save((err, newCurriculum)=>{
        if(err) res.status(500).send("error en la petición");
        else{
            if(!newCurriculum) res.status(404).send("no se ha guardado");
            else res.status(200).send(newCurriculum);
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
        image : req.body.image
    };

    curriculum.findByIdAndUpdate(curriculumId, update, (err, curriculumUpdated)=>{
        if (err) res.status(500).send('error al guardar malla curricular');
        else {
            if (!curriculumUpdated) res.status(404).send('no se ha actualizado');
            else res.status(200).send(curriculumUpdated);
        }
    });
}

CurriculumController.delete_curriculum = (req, res) => {
    var curriculumId = req.params.id;

    Curriculum.findByIdAndUpdate(curriculumId,{status:false} ,(err, curriculumRemoved)=>{
        if (err) res.status(500).send('error en la petición');
        else {
            if (!curriculumRemoved) res.status(404).send('error al eliminar');
            else res.status(200).send('Se ha eliminado');
        }
    });
}

CurriculumController.all_curriculum = (req, res) => {
    var curriculums = Curriculum.find({status:true});
    curriculums.populate({ path: 'career' }).exec((err, curriculums) => {
        if (err) res.status(500).send("Error");
        else {
            if (!curriculums) res.status(404).send("error al listar");
            else res.status(200).send(curriculums);
        }
    });
}

module.exports = {
    CurriculumController
};