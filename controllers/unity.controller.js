'use strict'

var Unity = require('../models/unity.model');
var SubjectTeacher = require('../models/subject_teacher.model');
var Class = require('../models/class.model');
var helpers = require('../lib/helpers');
var UnityController = {};

UnityController.load_content_home_view = (req, res) => {
    var unity = [];
    SubjectTeacher.findById(req.params.id).populate({ path: 'subject', select: 'name' }).populate({ path: 'unities', populate: { path: 'classes' } }).exec((err, subjectTeacher) => {
        if (err) console.log(err);
        else {
            res.send( subjectTeacher);
            //res.render('teacherProfile/content_home', { title: "Materia", subjectTeacher: subjectTeacher });
        }
    });
};


UnityController.load_create_view = (req, res) => {
    SubjectTeacher.findById(req.params.id, (err, subjectTeacher) => {
        if (err) console.log(err);
        else res.render('teacherProfile/create_unity', { title: "Materia", subjectTeacher: subjectTeacher });
    });
};

UnityController.save_unity = (req, res) => {
    var start_unity = helpers.formatDate(req.body.start_unity);
    var end_unity = helpers.formatDate(req.body.end_unity);

    SubjectTeacher.findById(req.body.subjectTeacher, (err, subjectTeacher) => {
        if (err) console.log(err);
        else {
            new Unity({
                name: req.body.name,
                start_unity: start_unity,
                end_unity: end_unity,
                subjectTeacher: subjectTeacher._id
            }).save((err, newunity) => {
                if (err) {
                    console.log(err);
                    req.flash('BAD', 'Ha ocurrido un error al guardar la Unidad', '/unity/' + subjectTeacher._id);
                } else {
                    console.log(newunity);
                    req.flash('GOOD', 'Se ha guardado con éxito la Unidad', '/unity/' + subjectTeacher._id);
                }
            });
        }
    });
}

UnityController.get_Class = (req, res) => {
    var UnityId = req.params.id;
    Class.findById(UnityId, (err, Class) => {
        if (err) res.status(500).send('error en la petición');
        else {
            if (!Class) res.status(404).send('la unidad no existe');
            else res.status(200).send(Class);
        }
    });
}

UnityController.update_Unity = (req, res) => {
    var UnityId = req.params.id;
    var update = {
        name: req.body.name,
        description: req.body.description
    };

    Class.findByIdAndUpdate(UnityId, update, (err, UnityUpdated) => {
        if (err) res.status(500).send('error al guardar clase');
        else {
            if (!UnityUpdated) res.status(404).send('no se ha actualizado');
            else res.status(200).send(UnityUpdated);
        }
    });
}

UnityController.delete_Class = (req, res) => {
    var UnityId = req.params.id;

    Unity.findByIdAndUpdate(UnityId, { status: false }, (err, UnityRemoved) => {
        if (err) res.status(500).send('error en la petición');
        else {
            if (!UnityRemoved) res.status(404).send('error al eliminar');
            else res.status(200).send('Se ha eliminado');
        }
    });
}

UnityController.all_Unity = (req, res) => {
    var Unity = Unity.find({ status: true });
    Unity.sort('name').exec((err, Unity) => {
        if (err) res.status(500).send("Error");
        else {
            if (!Unity) res.status(404).send("error al listar");
            else res.status(200).send(Unity);
        }
    });
}


module.exports = UnityController;
