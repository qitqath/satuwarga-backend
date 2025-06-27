const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    type: {
        type: String,
        enum: ['Kritik', 'Saran'],
        required: [true, 'Type is required']
    },
    // Menyimpan ID user yang mengirim feedback
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true // Otomatis menambahkan createdAt dan updatedAt
});

module.exports = mongoose.model('Feedback', FeedbackSchema);