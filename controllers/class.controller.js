'use strict'

var Class = require('../models/class.model');
var Unity = require('../models/unity.model');
var helpers = require('../lib/helpers');
var ClassController = {};

ClassController.load_class_create_view = (req, res) => {
    Unity.findById(req.params.id, (err, unity) => {
        if (err) console.log(err);
        else res.render('teacherProfile/create_class', { title: 'Crear Clase',unity:unity });
    });
};


ClassController.save_class = (req, res) => {
    Unity.findById(req.body.unity, (err, unity) => {
        if (err) console.log(err);
        else {
            console.log(unity);
            
            // var date = helpers.formatDate(req.body.date);
            // new Class({
            //     topic: req.body.topic,
            //     parallel: req.body.parallel,
            //     date: date,
            //     unity: req.body.unity
            // }).save((err, newClass) => {
            //     console.log(unity.subjectTeacher);
                
            //     if (err) req.flash('BAD','Ocurrio un error al guardar la clase','/unity/'+unity.subjectTeacher);
            //     else{
            //         console.log(newClass);
            //         req.flash('GOOD','Se ha guardado Correctamente la clase','/unity/'+unity.subjectTeacher);
            //     } 
            // });
        }
    });
}

ClassController.get_Class = (req, res) => {
    var ClassId = req.params.id;
    Class.findById(ClassId, (err, Class) => {
        if (err) res.status(500).send('error en la petición');
        else {
            if (!Class) res.status(404).send('la clase no existe');
            else res.status(200).send(Class);
        }
    });
}

ClassController.update_Class = (req, res) => {
    var ClassId = req.params.id;
    var update = {
        name: req.body.name,
        description: req.body.description
    };

    Class.findByIdAndUpdate(ClassId, update, (err, ClassUpdated) => {
        if (err) res.status(500).send('error al guardar clase');
        else {
            if (!ClassUpdated) res.status(404).send('no se ha actualizado');
            else res.status(200).send(ClassUpdated);
        }
    });
}

ClassController.delete_Class = (req, res) => {
    var ClassId = req.params.id;

    Class.findByIdAndUpdate(ClassId, { status: false }, (err, ClassRemoved) => {
        if (err) res.status(500).send('error en la petición');
        else {
            if (!ClassRemoved) res.status(404).send('error al eliminar');
            else res.status(200).send('Se ha eliminado');
        }
    });
}

ClassController.all_Class = (req, res) => {
    var Class = Class.find({ status: true });
    Class.sort('name').exec((err, Class) => {
        if (err) res.status(500).send("Error");
        else {
            if (!Class) res.status(404).send("error al listar");
            else res.status(200).send(Class);
        }
    });
}


module.exports = ClassController;