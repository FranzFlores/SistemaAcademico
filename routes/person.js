'use strict'

var express = require('express');
var router = express.Router();
const passport = require('passport');

var personController = require('../controllers/person.controller');

//Cargar Vistas
router.get('/registerTeacher', personController.load_register_teacher);
router.get('/registerStudent', personController.load_register_student);


//Registro de Persona
router.post('/signup', personController.savePerson);

//Inicio de Sesion 
router.post('/signin', passport.authenticate('local-singin', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));


router.get('/allStudents', personController.all_students);
router.get('/allTeachers', personController.all_teachers);

router.put('/update/:id', personController.update_person);
router.put('/delete/:id', personController.delete_person);

module.exports = router;