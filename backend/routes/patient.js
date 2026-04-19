const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/record', patientController.createPatientRecord);
router.get('/record/:patientID', patientController.getPatientRecord);
router.put('/record/:patientID', patientController.updatePatientRecord);
router.get('/institution/:institutionId', patientController.getInstitutionPatients);

module.exports = router;