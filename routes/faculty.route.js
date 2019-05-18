'use strict'

var express = require('express');
var FacultyController = require('../controllers/faculty.controller');
var router = express.Router();

router.get('/faculty', FacultyController.all_facults);
router.get('/faculty:id', FacultyController.get_faculty);
router.post('/faculty', FacultyController.save_faculty);
router.put('/faculty:id', FacultyController.update_faculty);
router.put('/faculty:id', FacultyController.delete_faculty);

module.exports = router;
