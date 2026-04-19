const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/admin/login', authController.adminLogin);
router.post('/admin/logout', authController.adminLogout);
router.get('/verify', authController.verifyToken);

module.exports = router;