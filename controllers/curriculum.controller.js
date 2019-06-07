'use strict'

var Curriculum = require('../models/curriculum.model');
var CurriculumCycle = require('../models/curriculum_cycle.model');
var Cycle = require('../models/cycle.model');
var CurriculumController = {};

//Cargar Vistas
CurriculumController.load_curriculum_view = (req, res) => {
    Curriculum.find().populate({ path: 'career' }).exec((err, curriculums) => {
        if (err) console.log(err);
        else {
            console.log(curriculums);
            res.render('adminProfile/curriculum', { title: 'Malla Curricular', curriculums: curriculums });
        }
    });
};

CurriculumController.save_curriculum = (req, res) => {
    new Curriculum({
        year: req.body.year,
        numCycles: req.body.numCycles,
        timeCycle: req.body. timeCycle,
        career: req.body.career
    }).save((err, newCurriculum) => {
        if (err) console.log(err);
        else {
            for (let index = 1; index <= req.body.numCycles; index++) {
                Cycle.findOne({number:index},(err,cycle)=>{
                    if(err) console.log(err);
                    else{
                        new CurriculumCycle({
                            curriculum: newCurriculum._id,
                            cycle: cycle._id
                        }).save((err, curriculumCycle) => {
                            if (err) req.flash('BAD', "Ha ocurrido un error al guardar la malla curricular", "/curriculum");
                            else{
                                console.log(curriculumCycle);
                                if(index==req.body.numCycles) req.flash('GOOD', "Se ha guardado la malla curricular con éxito", "/curriculum");
                            }
                        }); 
                    }
                })     
            }  
        }  
    });
}

CurriculumController.all_curriculum = (req, res) => {
    Curriculum.find().populate({ path: 'career' }).exec((err, curriculums) => {
        if (err) res.status(500).send("Error");
        else res.status(200).send(curriculums);
    });
}

CurriculumController.get_curriculum = (req, res) => {
    Curriculum.findById(req.params.id, (err, curriculum) => {
        if (err) res.status(500).send('error en la petición');
        else res.status(200).send(curriculum);
    });
}

CurriculumController.update_curriculum = (req, res) => {
    var update = {
        year: req.body.year,
        timeCycle: req.body.timeCycle,    
    };

    Curriculum.findByIdAndUpdate(req.params.id, update, (err, curriculumUpdated) => {
        if (err) req.flash('BAD', "Ha ocurrido un error al actualizar la malla curricular", "/curriculum");
        else {
            if (!curriculumUpdated) req.flash('OK', "No se pudo actualizar la malla curricular", "/curriculum");
            else req.flash('GOOD', "Se ha actualizado la malla curricular con éxito", "/curriculum");
        }
    });
}

CurriculumController.delete_curriculum = (req, res) => {

    CurriculumCycle.findOne({ curriculum: req.params.id }, (err, result) => {
        if (err) console.log(err);
        else {
            if (result) {
                res.status(200).send('Yes');
            } else {
                Curriculum.findByIdAndRemove(req.params.id, (err, curriculumRemoved) => {
                    if (err) console.log(err);
                    else res.status(200).send('OK');
                });
            }
        }
    });


};



module.exports = CurriculumController;
