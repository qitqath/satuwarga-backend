const express = require('express');
const router = express.Router();

// Impor controller dan middleware
const { 
    createReport, 
    getReports, 
    getReportById, // <-- Impor fungsi baru
    updateReportStatus 
} = require('../controllers/reportController');
const auth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

// Endpoint yang sudah ada
router.route('/').post(auth, createReport).get(auth, getReports);

// Tambahkan rute baru di sini
// Rute ini harus diproteksi juga, minimal oleh 'auth'
router.get('/:id', auth, getReportById); // <-- Tambahkan rute ini

// Endpoint yang sudah ada
router.put('/:id/status', [auth, checkRole(['rt', 'rw', 'admin'])], updateReportStatus);


module.exports = router;