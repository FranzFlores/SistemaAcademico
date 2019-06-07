'use strict'

var express = require('express');
var SubjectPeriodController = require('../controllers/subject_period.controller');
var router = express.Router();

const { isLoggedIn } = require('../lib/auth'); 

//Cargar Vistas


router.get('/all', SubjectPeriodController.all_period_subjects);

// router.get('/subject:id',SubjectController.get_subject);
router.post('/create',SubjectPeriodController.save_subject_period);
// router.put('/subject:id',SubjectController.update_subject);
// router.put('/subject:id',SubjectController.delete_subject);

module.exports = router;