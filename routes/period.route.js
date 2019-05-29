'use strict'

var express = require('express');
var PeriodController = require('../controllers/period.controller');
const { isLoggedIn } = require('../lib/auth');
var router = express.Router();

//Vistas 
router.get('/',isLoggedIn,PeriodController.load_period_view);

router.post('/create',isLoggedIn,PeriodController.save_period);
router.post('/addPeriodSubject',PeriodController.add_subject_period);
// router.get('/all',CareerController.all_careers);

// router.get('/:id',CareerController.get_career);
// router.post('/update/:id',CareerController.update_career);
// router.post('/delete/:id',CareerController.delete_career);
 
module.exports = router;