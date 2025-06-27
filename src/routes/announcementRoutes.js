const express = require('express');
const {
    createAnnouncement,
    getAnnouncements,
    updateAnnouncement,
    deleteAnnouncement,
} = require('../controllers/announcementController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, authorize('rt', 'rw', 'admin'), createAnnouncement);
router.get('/', protect, getAnnouncements);
router.put('/:id', protect, updateAnnouncement); // Authorization handled in controller
router.delete('/:id', protect, deleteAnnouncement); // Authorization handled in controller

module.exports = router;