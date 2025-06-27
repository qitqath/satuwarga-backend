// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nama: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    alamat: { type: String, required: true },
    role: {
        type: String,
        enum: ['warga', 'rt', 'rw', 'admin'],
        default: 'warga',
    },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);