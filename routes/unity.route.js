'use strict'

var express = require('express');
var UnityController = require('../controllers/unity.controller');
var router = express.Router();

const { isLoggedIn } = require('../lib/auth');

//Cargar Vistas
router.get('/:id',isLoggedIn,UnityController.load_content_home_view);
router.get('/new/:id',isLoggedIn,UnityController.load_create_view);

router.post('/create',UnityController.save_unity);

// router.get('/all',SubjectController.all_subject);
// router.get('/subject:id',SubjectController.get_subject);
// router.put('/subject:id',SubjectController.update_subject);
// router.put('/subject:id',SubjectController.delete_subject);

module.exports = router;