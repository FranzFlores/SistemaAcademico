'use strict'

var express = require('express');
var CurriculumController = require('../controllers/curriculum.controller');
var router = express.Router();

const { isLoggedIn } = require('../lib/auth');

//Cargar Vistas
router.get('/',isLoggedIn,CurriculumController.load_curriculum_view);

router.get('/all',CurriculumController.all_curriculum);
router.get('/:id',CurriculumController.get_curriculum);
router.post('/create',CurriculumController.save_curriculum);
router.post('/update/:id',CurriculumController.update_curriculum);
router.post('/delete/:id',CurriculumController.delete_curriculum);

module.exports = router;