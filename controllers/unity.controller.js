'use strict'

var Unity = require('../models/unity.models');
var UnityController = {};


UnityController.save_class = (req,res)=>{
    new Class({
        name: req.body.name,
        description: req.body.description
    }).save((err, newclass)=>{
        if(err) res.status(500).send("error");
        else{
            if(!newClass) res.status(404).send("no se ha guardado");
            else res.status(200).send(newUnity);
        }
    });
}

UnityController.get_Class = (req,res)=>{
    var UnityId = req.params.id;
    Class.findById(UnityId, (err, Class) =>{
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
        name : req.body.name,
        description : req.body.description
    };

    Class.findByIdAndUpdate(UnityId, update, (err, UnityUpdated)=>{
        if (err) res.status(500).send('error al guardar clase');
        else {
            if (!UnityUpdated) res.status(404).send('no se ha actualizado');
            else res.status(200).send(UnityUpdated);
        }
    });
}

UnityController.delete_Class= (req, res) => {
    var UnityId = req.params.id;

    Unity.findByIdAndUpdate(UnityId,{status:false} ,(err, UnityRemoved)=>{
        if (err) res.status(500).send('error en la petición');
        else {
            if (!UnityRemoved) res.status(404).send('error al eliminar');
            else res.status(200).send('Se ha eliminado');
        }
    });
}

UnityController.all_Unity = (req, res) => {
    var Unity = Unity.find({status:true});
    Unity.sort('name').exec((err, Unity) => {
        if (err) res.status(500).send("Error");
        else {
            if (!Unity) res.status(404).send("error al listar");
            else res.status(200).send(Unity);
        }
    });
}


module.exports = UnityController;
