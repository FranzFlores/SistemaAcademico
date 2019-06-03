'use strict'

var express = require('express');
var ClassController = require('../controllers/class.controller');
var router = express.Router();

const { isLoggedIn } = require('../lib/auth');

//Cargar Vistas
router.get('/new/:id',isLoggedIn,ClassController.load_class_create_view);

router.post('/create',ClassController.save_class);

// router.get('/all',SubjectController.all_subject);
// router.get('/subject:id',SubjectController.get_subject);
// router.put('/subject:id',SubjectController.update_subject);
// router.put('/subject:id',SubjectController.delete_subject);

module.exports = router;