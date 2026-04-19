const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/institutions', auth, adminController.addInstitution);
router.get('/institutions', auth, adminController.getInstitutions);
router.put('/institutions/:id', auth, adminController.updateInstitution);
router.delete('/institutions/:id', auth, adminController.deleteInstitution);

router.get('/reports', auth, adminController.getAllReports);
router.get('/reports/institution/:institutionId', auth, adminController.getInstitutionReports);
router.get('/statistics', auth, adminController.getStatistics);
router.get('/employees', auth, adminController.getEmployees);

module.exports = router;