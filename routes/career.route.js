'use strict'

var express = require('express');
var CareerController = require('../controllers/career.controller');
var router = express.Router();

router.get('/career',CareerController.all_careers);
router.get('/career:id',CareerController.get_career);
router.post('/career',CareerController.save_career);
router.put('/career:id',CareerController.update_career);
router.put('/career:id',CareerController.delete_career);

module.exports = router;