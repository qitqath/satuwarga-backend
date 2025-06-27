const Feedback = require('../models/Feedback');

// @desc    Create new feedback
// @route   POST /
exports.createFeedback = async (req, res) => {
    const { content, type } = req.body;
    try {
        // Validasi input dasar
        if (!content || !type) {
            return res.status(400).json({ msg: 'Please provide content and type (Kritik/Saran)' });
        }

        const newFeedback = new Feedback({
            content,
            type,
            user: req.user.id // Diambil dari token middleware
        });

        const feedback = await newFeedback.save();
        res.status(201).json({ msg: 'Thank you for your feedback!', data: feedback });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get all feedback (for admins/RT/RW)
// @route   GET /
exports.getFeedback = async (req, res) => {
    try {
        // Mengambil semua feedback dan mengisinya dengan data nama dan email dari user yang mengirim
        const feedbacks = await Feedback.find()
            .populate('user', ['nama', 'email'])
            .sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};