var express = require('express');
var router = express.Router();

//Menu de Registro 
router.get('/menu',function(req,res,next){
  console.log(req);
  //res.render('register/menu-register',{title: 'Academy Loja'});
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Academy Loja' });
});


module.exports = router;  
