'use strict'

var express = require('express');
var FacultyController = require('../controllers/faculty.controller');
const { isLoggedIn } = require('../lib/auth');
var router = express.Router();

//Vista
router.get('/',isLoggedIn,FacultyController.load_faculty_view);

router.get('/all', FacultyController.all_faculties);
router.get('/:id', FacultyController.get_faculty);
router.post('/create',isLoggedIn, FacultyController.save_faculty);
router.post('/update/:id', FacultyController.update_faculty);
router.post('/delete/:id', FacultyController.delete_faculty);

module.exports = router;
