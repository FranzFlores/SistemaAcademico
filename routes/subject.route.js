'use strict'

var express = require('express');
var SubjectController = require('../controllers/subject.controller');
var router = express.Router();

const { isLoggedIn } = require('../lib/auth');

//Cargar Vistas
router.get('/',isLoggedIn,SubjectController.load_subject_view);

router.get('/all',SubjectController.all_subject);
router.get('/:id',SubjectController.get_subject);
router.post('/create',SubjectController.save_subject);
router.post('/update/:id',SubjectController.update_subject);
router.post('/subject:id',SubjectController.delete_subject);

module.exports = router;