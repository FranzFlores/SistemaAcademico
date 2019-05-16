'use strict'
var mongoose = require('mongoose');

var helpers = require('../lib/helpers');
var Account = require('../models/account.model');

const AccountController = {};

AccountController.test = (req,res)=>{
  res.send('OK');
};

AccountController.update_password = (req, res) => {
  var accountId = req.params.id;
  var newPassword = req.body.newPassword;
  var oldPassword = req.body.oldPassword;
  
  Account.findById(accountId, (err, account) => {
    if (err) res.status(500).send('Error');
    if (account) {
      if (helpers.matchPassword(oldPassword,account.password)) {
        var hash = helpers.generateHash(newPassword);
        var update = {};
        update.password = hash;
        Account.findByIdAndUpdate(accountId, update, (err, account) => {
          if (err) res.status(500).send({ message: "Error en la peticion" });
          else {
            if (!account) res.status(404).send({ message: "No se actualizo la cuenta" });
            else res.status(200).send({"account":account});
          }
        });
      }
    }
  });
};





module.exports = AccountController;