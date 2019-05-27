'use strict'

var express = require('express');
var router = express.Router();
const passport = require('passport');

var personController = require('../controllers/person.controller');
var accountController = require('../controllers/account.controller');
const { isLoggedIn } = require('../lib/auth');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/person'});

//Cargar Vistas
router.get('/teacher',isLoggedIn, personController.load_register_teacher);
router.get('/student',isLoggedIn, personController.load_register_student);

router.get('/myProfile',isLoggedIn,personController.load_profile);
router.get('/updateProfile',isLoggedIn,personController.load_update_profile_view);
router.get('/updateImage',isLoggedIn,personController.load_update_image_view);

//Registro de Persona
router.post('/signup', personController.savePerson);

//Inicio de Sesion 
router.post('/signin', passport.authenticate('local-singin', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

//Cerrar Sesion
router.get('/logout',isLoggedIn,personController.logout);

//Actualizar informacion
router.post('/update-info/:id',personController.update_info_person);
router.post('/update-password/:id',accountController.update_password);
router.post('/upload-image/:id',[md_upload,isLoggedIn],personController.uplodImage);
router.get('/get-image-person/:imageFile',personController.getImageFile);

router.get('/allStudents', personController.all_students);
router.get('/allTeachers', personController.all_teachers);

router.put('/update/:id', personController.update_person);
router.put('/delete/:id', personController.delete_person);

module.exports = router;