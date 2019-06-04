'use strict'

var express = require('express');
var EnrollmentController = require('../controllers/enrollment.controller');
var router = express.Router();

const { isLoggedIn } = require('../lib/auth');

//Cargar Vistas
router.get('/:id',isLoggedIn,EnrollmentController.load_enrollement_view);

// router.get('/all',CurriculumController.all_curriculum);
// router.get('/:id',CurriculumController.get_curriculum);
// router.post('/create',CurriculumController.save_curriculum);
// router.put('/curriculum:id',CurriculumController.update_curriculum);
// router.put('/curriculum:id',CurriculumController.delete_curriculum);

module.exports = router;