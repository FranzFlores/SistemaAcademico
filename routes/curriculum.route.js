'use strict'

var express = require('express');
var CurriculumController = require('../controllers/curriculum.controller');
var router = express.Router();

router.get('/curriculum',CurriculumController.all_curriculums);
router.get('/curriculum:id',CurriculumController.get_curriculum);
router.post('/curriculum',CurriculumController.save_curriculum);
router.put('/curriculum:id',CurriculumController.update_curriculum);
router.put('/curriculum:id',CCurriculumController.delete_curriculum);

module.exports = router;