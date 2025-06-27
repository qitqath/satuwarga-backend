const Announcement = require('../models/Announcement');

// @desc    Get all announcements
// @route   GET /
exports.getAnnouncements = async (req, res) => {
    try {
        // TAMBAHKAN .populate() DI SINI
        const announcements = await Announcement.find()
            .populate('user', 'nama role alamat') // Mengisi field 'user' dengan field 'nama', 'role', dan 'alamat' dari koleksi User
            .sort({ createdAt: -1 });
            
        res.status(200).json(announcements);
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
            user: req.user.id,
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

        // --- PERBAIKAN DI SINI ---
        // Ganti 'author' menjadi 'user'
        if (announcement.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Update data
        if (title) announcement.title = title;
        if (content) announcement.content = content;
        announcement.updatedAt = Date.now(); // Ini bagus, tapi Mongoose bisa melakukannya otomatis dengan timestamps

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

        // --- PERBAIKAN DI SINI ---
        // Ganti 'author' menjadi 'user' agar sesuai dengan model saat pembuatan
        if (announcement.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // --- PERBAIKAN OPSIONAL TAPI DIANJURKAN ---
        // Menggunakan metode modern .deleteOne()
        await announcement.deleteOne(); 

        res.json({ msg: 'Announcement removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};