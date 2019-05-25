'use strict'
var mongoose = require('mongoose');

var helpers = require('../lib/helpers');
var Account = require('../models/account.model');

const AccountController = {};

AccountController.load_login = (req,res)=>{
  res.render('register/login',{title:"Inicio de Sesión"});
};

AccountController.update_password = (req, res) => {
  var newPassword = req.body.newPassword;
  var oldPassword = req.body.oldPassword;
  
  Account.findById(req.params.id, (err, account) => {
    if (err) req.flash('BAD',"Ha ocurrido un error al actualizar contraseña","/person/myProfile");
    if (account) {
      if (helpers.matchPassword(oldPassword,account.password)) {
        var hash = helpers.generateHash(newPassword);
        var update = {};
        update.password = hash;
        Account.findByIdAndUpdate(req.params.id, update, (err, account) => {
          if (err) req.flash('BAD',"Ha ocurrido un error al actualizar contraseña","/person/myProfile");
          else {
            if (!account) req.flash('OK',"No se ha podido actualizar la contraseña","/person/myProfile");
            else req.flash('GOOD',"Se ha actualizado la contraseña con éxito","/person/myProfile");
          }
        });
      }
    }
  });
};





module.exports = AccountController;