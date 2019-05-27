'use strict'

var Class = require('../models/class.model');
var ClassController = {};


ClassController.save_class = (req,res)=>{
    new Class({
        name: req.body.name,
        description: req.body.description
    }).save((err, newclass)=>{
        if(err) res.status(500).send("error");
        else{
            if(!newClass) res.status(404).send("no se ha guardado");
            else res.status(200).send(newClass);
        }
    });
}

ClassController.get_Class = (req,res)=>{
    var ClassId = req.params.id;
    Class.findById(ClassId, (err, Class) =>{
        if (err) res.status(500).send('error en la petición');
        else {
            if (!Class) res.status(404).send('la clase no existe');
         else res.status(200).send(Class);
        }
    });
}

classController.update_Class = (req, res) => {
    var ClassId = req.params.id;
    var update = {
        name : req.body.name,
        description : req.body.description
    };

    Class.findByIdAndUpdate(ClassId, update, (err, ClassUpdated)=>{
        if (err) res.status(500).send('error al guardar clase');
        else {
            if (!ClassUpdated) res.status(404).send('no se ha actualizado');
            else res.status(200).send(ClassUpdated);
        }
    });
}

ClassController.delete_Class= (req, res) => {
    var ClassId = req.params.id;

    Class.findByIdAndUpdate(ClassId,{status:false} ,(err, ClassRemoved)=>{
        if (err) res.status(500).send('error en la petición');
        else {
            if (!ClassRemoved) res.status(404).send('error al eliminar');
            else res.status(200).send('Se ha eliminado');
        }
    });
}

ClassController.all_Class = (req, res) => {
    var Class = Class.find({status:true});
    Class.sort('name').exec((err, Class) => {
        if (err) res.status(500).send("Error");
        else {
            if (!Class) res.status(404).send("error al listar");
            else res.status(200).send(Class);
        }
    });
}


module.exports = ClassController;