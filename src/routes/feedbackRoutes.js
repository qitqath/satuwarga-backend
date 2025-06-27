const express = require('express');

// --- PERBAIKAN DI SINI ---
// Pastikan nama fungsi sama persis dengan yang diekspor di controller.
const { createFeedback, getFeedbacks } = require('../controllers/feedbackController'); 
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Baris ini sudah benar
router.post('/', protect, createFeedback);

// --- DAN PERBAIKAN DI SINI ---
// Gunakan variabel yang sudah diperbaiki namanya.
router.get('/', protect, authorize('rt', 'rw', 'admin'), getFeedbacks);

module.exports = router;