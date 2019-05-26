'use strict'

var express = require('express');
var SubjectController = require('../controllers/subject.controller');
var router = express.Router();

const { isLoggedIn } = require('../lib/auth');

//Cargar Vistas
router.get('/',isLoggedIn,SubjectController.load_subject_view);

router.get('/subject',SubjectController.all_subject);
router.get('/subject:id',SubjectController.get_subject);
router.post('/create',SubjectController.save_subject);
router.put('/subject:id',SubjectController.update_subject);
router.put('/subject:id',SubjectController.delete_subject);

module.exports = router;