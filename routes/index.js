var express = require('express');
var router = express.Router();

var accountController = require("../controllers/account.controller");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Academy Loja' });
});

//Menu de Registro 
router.get('/menu-register',function(req,res,next){
  res.render('register/menu-register',{title: 'Academy Loja'});
});

//login
router.get('/login',accountController.load_login);

//Perfil por Defecto
router.get("/profile",function(req,res,next){
  res.render("defaultProfile",{title:"Mi perfil"});
});


module.exports = router;  
