// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    // Merujuk ke pengguna yang membuat laporan, sesuai dengan Class Diagram [cite: 105]
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    judul: {
        type: String,
        required: [true, 'Judul laporan tidak boleh kosong']
    },
    // Deskripsi, kategori, lokasi, dan lampiran sesuai Functional Requirement 
    deskripsi: {
        type: String,
        required: [true, 'Deskripsi laporan tidak boleh kosong']
    },
    kategori: {
        type: String,
        required: true,
        // Kategori ini bisa disesuaikan dengan kebutuhan [cite: 95]
        enum: ['keamanan', 'kesehatan', 'sosial', 'infrastruktur', 'lainnya']
    },
    lokasi: {
        alamat: String,
        // Menggunakan format GeoJSON untuk integrasi peta seperti Google Maps [cite: 85]
        koordinat: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                index: '2dsphere' // Index untuk query berbasis geospasial
            }
        }
    },
    // Array of strings yang berisi URL ke file foto/video di Firebase Storage [cite: 84]
    lampiran: [{
        type: String
    }],
    // Status laporan untuk tracking 
    status: {
        type: String,
        enum: ['dikirim', 'diproses', 'selesai', 'ditolak'],
        default: 'dikirim'
    },
    // Catatan dari RT/RW/Admin yang menangani
    catatanPetugas: {
        type: String
    }
}, {
    timestamps: true
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;