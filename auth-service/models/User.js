// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    // Gunakan email atau NIK sebagai username unik untuk login
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    // Peran pengguna sesuai dengan tabel karakteristik pengguna di SRS [cite: 62]
    role: {
        type: String,
        required: true,
        enum: ['warga', 'rt', 'rw', 'admin'],
        default: 'warga'
    },
    alamat: {
        type: String,
        required: true
    },
    // Informasi tambahan yang mungkin diperlukan untuk verifikasi
    nik: { // Nomor Induk Kependudukan
        type: String,
        unique: true,
        sparse: true // Memungkinkan nilai null/tidak ada tapi jika ada harus unik
    }
}, {
    // Secara otomatis menambahkan field createdAt dan updatedAt
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);