const express = require('express');
const router = express.Router();
const { 
    getAnnouncements, 
    createAnnouncement,
    getAnnouncementById, // <-- Impor fungsi baru
    updateAnnouncement,  // <-- Impor fungsi baru
    deleteAnnouncement   // <-- Impor fungsi baru
} = require('../controllers/announcementController');
const auth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

// Rute untuk Create dan Read (All)
router.route('/')
    .get(auth, getAnnouncements)
    .post([auth, checkRole(['rt', 'rw', 'admin'])], createAnnouncement);

// Rute untuk Read (Single), Update, dan Delete
router.route('/:id')
    .get(auth, getAnnouncementById)
    .put(auth, updateAnnouncement) // Cek otorisasi dilakukan di dalam controller
    .delete(auth, deleteAnnouncement); // Cek otorisasi dilakukan di dalam controller

module.exports = router;