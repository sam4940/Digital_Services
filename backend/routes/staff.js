const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

router.post('/register', staffController.registerEmployee);
router.post('/report', staffController.submitReport);
router.get('/institutions', staffController.getInstitutions);
router.get('/my-reports/:employeeID', staffController.getEmployeeReports);

module.exports = router;