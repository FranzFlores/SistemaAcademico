'use strict'

var express = require('express');
var SubjectController = require('../controllers/subject.controller');
var router = express.Router();

router.get('/subject',SubjectController.all_subjects);
router.get('/subject:id',SubjectController.get_subject);
router.post('/subject',SubjectController.save_subject);
router.put('/subject:id',SubjectController.update_subject);
router.put('/subject:id',SubjectController.delete_subject);

module.exports = router;