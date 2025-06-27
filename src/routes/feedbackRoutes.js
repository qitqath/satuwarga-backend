const express = require('express');
const { createFeedback, getFeedback } = require('../controllers/feedbackController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createFeedback);
router.get('/', protect, authorize('rt', 'rw', 'admin'), getFeedback);

module.exports = router;