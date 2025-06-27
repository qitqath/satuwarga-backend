// models/Report.js
const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    judul: { type: String, required: true },
    deskripsi: { type: String, required: true },
    kategori: { type: String, required: true },
    status: {
        type: String,
        enum: ['diajukan', 'diproses', 'selesai', 'ditolak'],
        default: 'diajukan',
    },
    catatanPetugas: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Report', ReportSchema);1