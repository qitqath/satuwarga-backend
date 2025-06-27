const Announcement = require('../models/Announcement');

// @desc    Get all announcements
// @route   GET /
exports.getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.json(announcements);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a new announcement
// @route   POST /
exports.createAnnouncement = async (req, res) => {
    const { title, content } = req.body;
    try {
        const newAnnouncement = new Announcement({
            title,
            content,
            author: {
                id: req.user.id, // Diambil dari token
                nama: req.user.nama // Kita perlu modifikasi middleware untuk ini
            }
        });

        const announcement = await newAnnouncement.save();
        res.status(201).json(announcement);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get single announcement by ID
// @route   GET /:id
exports.getAnnouncementById = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) {
            return res.status(404).json({ msg: 'Announcement not found' });
        }
        res.json(announcement);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @desc    Update an announcement
// @route   PUT /:id
exports.updateAnnouncement = async (req, res) => {
    const { title, content } = req.body;
    try {
        let announcement = await Announcement.findById(req.params.id);
        if (!announcement) {
            return res.status(404).json({ msg: 'Announcement not found' });
        }

        // Cek otorisasi: Hanya pembuat asli atau admin yang bisa mengedit
        if (announcement.author.id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Update data
        if (title) announcement.title = title;
        if (content) announcement.content = content;
        announcement.updatedAt = Date.now();

        const updatedAnnouncement = await announcement.save();
        res.json(updatedAnnouncement);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @desc    Delete an announcement
// @route   DELETE /:id
exports.deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) {
            return res.status(404).json({ msg: 'Announcement not found' });
        }

        // Cek otorisasi: Hanya pembuat asli atau admin yang bisa menghapus
        if (announcement.author.id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await announcement.remove();
        res.json({ msg: 'Announcement removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};