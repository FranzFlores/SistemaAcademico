'use strict'

var express = require('express');
var SubjectTeacherController = require('../controllers/subject_teacher.controller');
var router = express.Router();

const { isLoggedIn } = require('../lib/auth');

//Cargar Vistas
router.get('/:id',SubjectTeacherController.load_teacher_subject_view);

router.get('/all',SubjectTeacherController.get_teacher_subjects);

// router.get('/subject:id',SubjectController.get_subject);
router.post('/create',SubjectTeacherController.save_subject_teacher);
// router.put('/subject:id',SubjectController.update_subject);
// router.put('/subject:id',SubjectController.delete_subject);

module.exports = router;