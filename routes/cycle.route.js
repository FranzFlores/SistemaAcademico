'use strict'

var express = require('express');
var CycleController = require('../controllers/cycle.controller');
var router = express.Router();

router.get('/all',CycleController.all_cycle);
router.post('/create',CycleController.save_cycle);

module.exports = router;