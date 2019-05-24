'use strict'

var express = require('express');
var CareerController = require('../controllers/career.controller');
const { isLoggedIn } = require('../lib/auth');
var router = express.Router();

//Vistas 
router.get('/',isLoggedIn,CareerController.load_carrer_view);

// router.get('/career',CareerController.all_careers);
router.post('/create',CareerController.save_career);
router.get('/:id',CareerController.get_career);
router.post('/update/:id',CareerController.update_career);
router.put('/career:id',CareerController.delete_career);
 
module.exports = router;