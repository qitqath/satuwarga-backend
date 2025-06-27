const express = require('express');
const {
    createReport,
    getReports,
    getReportById,
    updateReportStatus,
} = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createReport);
router.get('/', protect, getReports);
router.get('/:id', protect, getReportById);
router.put('/:id/status', protect, authorize('rt', 'rw', 'admin'), updateReportStatus);

module.exports = router;