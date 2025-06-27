const express = require('express');
const router = express.Router();
const { createFeedback, getFeedbacks } = require('../controllers/feedbackController');
const auth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

// Endpoint untuk membuat feedback baru, bisa diakses semua user yang login
router.post('/', auth, createFeedback);

// Endpoint untuk melihat semua feedback, hanya bisa diakses oleh RT, RW, atau admin
router.get('/', [auth, checkRole(['rt', 'rw', 'admin'])], getFeedbacks);

module.exports = router;