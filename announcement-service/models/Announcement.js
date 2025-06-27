const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    // Menyimpan ID dan nama pembuat pengumuman
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        nama: {
            type: String,
            required: true
        }
    }
}, {
    timestamps: true // Otomatis menambahkan createdAt dan updatedAt
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);