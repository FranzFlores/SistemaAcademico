'use strict'

var express = require('express');
var CurriculumController = require('../controllers/curriculum.controller');
var router = express.Router();

const { isLoggedIn } = require('../lib/auth');

//Cargar Vistas
router.get('/',isLoggedIn,CurriculumController.load_curriculum_view);

router.get('/curriculum',CurriculumController.all_curriculum);
router.get('/curriculum:id',CurriculumController.get_curriculum);
router.post('/curriculum',CurriculumController.save_curriculum);
router.put('/curriculum:id',CurriculumController.update_curriculum);
router.put('/curriculum:id',CurriculumController.delete_curriculum);

module.exports = router;